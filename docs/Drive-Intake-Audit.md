# Google Drive Intake Integration Audit

**Generated:** 2025-01-27  
**Repository:** LaunchWorthy v2  
**Framework:** Next.js 14 (App Router)  
**Auditor:** Principal Full-Stack/Platform Engineer  

## Executive Summary

The LaunchWorthy v2 application currently features a sophisticated 3-step booking flow with file upload capabilities in Step 3 (`src/components/booking/BookingStep3.tsx:83-115`). However, **no persistent file storage system exists** - uploaded files are only stored in client state and simulated during submission. The application lacks authentication infrastructure, requiring a complete Google OAuth implementation.

**Recommended Approach:** **Option A - Picker-Centric UX** due to the application's focus on user experience and the existing file upload UI patterns that can be enhanced with Google Drive integration.

### Key Findings

- **Current `/book` Route:** Well-structured 3-step booking flow with existing file upload UI
- **Authentication:** None implemented - requires complete OAuth setup
- **Storage:** No persistent storage - files are simulated (`BookingStep3.tsx:112-115`)
- **File Processing:** No parsing pipeline - requires full implementation
- **Security:** Good foundation with proper environment variable handling

## Current `/book` Map

### Routes & Components
- **Primary Route:** `src/app/(site)/book/page.tsx` - Booking flow container
- **Layout:** `src/app/(site)/book/layout.tsx` - SEO metadata
- **Main Flow:** `src/components/booking/BookingFlow.tsx` - State orchestration
- **Step 1:** `src/components/booking/BookingStep1.tsx` - Contact & service selection
- **Step 2:** `src/components/booking/BookingStep2.tsx` - Payment processing  
- **Step 3:** `src/components/booking/BookingStep3.tsx` - Scheduling & file upload

### Current File Upload Implementation
```typescript
// src/components/booking/BookingStep3.tsx:83-90
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(event.target.files || []);
  setUploadedFiles(prev => [...prev, ...files]);
};

// src/components/booking/BookingStep3.tsx:112-115
if (uploadedFiles.length > 0) {
  // Simulate file upload
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

### Server Infrastructure
- **API Routes:** `src/app/api/create-checkout-session/route.ts`, `src/app/api/submit-booking-formspree/route.ts`
- **Payment:** Stripe integration with proper secret handling
- **Forms:** Formspree integration for booking completion
- **Storage:** None - files are not persisted

### Data Flow
```
Client: BookingStep3 → File Selection → Client State → Formspree (count only)
Missing: File Upload API → Storage → Parsing → Database
```

## Options Analysis

### Option A — Picker-Centric UX (RECOMMENDED)

**Summary:** Use Google Picker in client to browse user Drive, then server downloads/processes files

**Pros:**
- **Familiar UX** - Users already know Google Picker interface
- **Multi-select Support** - Native multi-file selection
- **Narrow Scope** - Focus on integration, not UI building
- **Existing UI Patterns** - Can enhance current file upload section

**Cons:**
- **Third-party Script** - Requires loading Google Picker API
- **Token Handoff** - Need secure token passing to server
- **Picker Dependency** - Relies on Google's UI component

**Implementation Complexity:** Medium
**User Experience:** Excellent
**Maintenance:** Low

### Option B — Server-Pull (No Picker)

**Summary:** Use Drive API to list files, build custom selector UI

**Pros:**
- **No Third-party UI** - Complete control over interface
- **Custom Filtering** - Build advanced search/filter capabilities
- **Brand Consistency** - Matches application design perfectly

**Cons:**
- **High Development Cost** - Significant UI/UX work required
- **Pagination Complexity** - Must handle Drive API pagination
- **Performance** - More API calls for file listing
- **Feature Parity** - Difficult to match Picker's functionality

**Implementation Complexity:** High
**User Experience:** Good (with significant work)
**Maintenance:** High

## Proposed Architecture

### Authentication Flow
```
User → Google OAuth → Access Token → Server Session → Drive API Access
```

**Scopes Required:**
- `https://www.googleapis.com/auth/drive.readonly` - Read Drive files
- `https://www.googleapis.com/auth/drive.metadata.readonly` - Read file metadata

**Security Boundaries:**
- **Client:** Only receives opaque session token
- **Server:** Stores OAuth credentials, manages token refresh
- **Environment:** `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`

### Data Flow Diagram
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client UI     │    │   Google Picker  │    │   Server API    │
│                 │    │                  │    │                 │
│ 1. Click Import │───▶│ 2. File Selection│───▶│ 3. Receive IDs  │
│                 │    │                  │    │                 │
│ 4. Show Status  │◀───│                  │◀───│ 5. Export Files │
│                 │    │                  │    │ 6. Store & Parse│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### File Processing Pipeline
```
Google Drive Files → Export (PDF/CSV/TXT) → Temporary Storage → 
Text Extraction → Permanent Storage → Database Record
```

**Supported Formats:**
- **Google Docs:** Export as `text/plain` or `application/pdf`
- **Google Sheets:** Export as `text/csv`
- **Google Slides:** Export as `application/pdf` (with OCR if needed)
- **PDF/DOCX/Images:** Download directly

## API & Component Plan

### New API Endpoints

**POST `/api/intake/drive`**
```typescript
// Request
{
  fileIds: string[],
  sessionToken: string
}

// Response
{
  files: Array<{
    id: string,
    title: string,
    mime: string,
    size: number,
    status: 'success' | 'error',
    storageKey?: string,
    textLength?: number,
    error?: string
  }>
}
```

### Component Updates

**Enhanced BookingStep3**
```typescript
// Add Google Drive import button alongside existing file upload
<GoogleDriveImportButton 
  onFilesImported={(files) => setUploadedFiles(prev => [...prev, ...files])}
  disabled={isSubmitting}
/>
```

**New Components**
- `GoogleDriveImportButton.tsx` - Picker integration
- `FileImportStatus.tsx` - Progress indicator
- `ImportedFileList.tsx` - Display imported files

## Risk Register & Mitigation

### R1: Secret Leakage (HIGH SEVERITY)
**Risk:** Google OAuth secrets exposed in client bundle  
**Mitigation:** Server-only environment variables, audit client bundles  
**Evidence:** Current Stripe implementation properly isolates secrets

### R2: Large File Timeouts (MEDIUM SEVERITY)
**Risk:** Large Google Docs/Sheets causing request timeouts  
**Mitigation:** Streaming downloads, background job processing  
**Evidence:** No current file size limits in existing upload

### R3: Scope Overreach (MEDIUM SEVERITY)
**Risk:** Requesting unnecessary Drive permissions  
**Mitigation:** Least-privilege scopes, user education  
**Evidence:** Current app follows security best practices

### R4: Token Expiration (MEDIUM SEVERITY)
**Risk:** Access tokens expiring during file processing  
**Mitigation:** Refresh token storage, retry logic  
**Evidence:** No current token management infrastructure

### R5: Rate Limiting (LOW SEVERITY)
**Risk:** Google Drive API rate limits  
**Mitigation:** Request batching, exponential backoff  
**Evidence:** Low expected usage volume

## Test Plan

### Unit Tests
- [ ] OAuth flow completion
- [ ] File export format detection
- [ ] Error handling for invalid file IDs
- [ ] Token refresh mechanism

### Integration Tests
- [ ] End-to-end file import flow
- [ ] Multi-file selection and processing
- [ ] Large file handling (>10MB)
- [ ] Network failure recovery

### Manual Testing Matrix
- [ ] **Google Docs:** Various sizes, formatting
- [ ] **Google Sheets:** Different data types, formulas
- [ ] **Google Slides:** Text extraction accuracy
- [ ] **PDF Files:** Direct download and parsing
- [ ] **Auth Denied:** User refuses permissions
- [ ] **Scope Too Narrow:** Insufficient permissions
- [ ] **Network Issues:** Intermittent connectivity

## Open Questions & Hypotheses

### H1: Storage Provider Selection
**Question:** Which storage provider should be used for imported files?  
**Evidence Needed:** 
- Current hosting platform (appears to be Vercel)
- Budget constraints
- File retention requirements

**Hypothesis:** Vercel Blob Storage for simplicity and integration

### H2: File Retention Policy
**Question:** How long should imported files be stored?  
**Evidence Needed:** 
- Legal requirements
- User privacy expectations
- Storage costs

**Hypothesis:** 90-day retention with user deletion option

### H3: Text Extraction Requirements
**Question:** What level of text extraction is needed for different file types?  
**Evidence Needed:** 
- Coaching workflow requirements
- File format analysis needs

**Hypothesis:** Basic text extraction sufficient for initial implementation

### H4: Team/Organization Drive Access
**Question:** Should users be able to access shared drives?  
**Evidence Needed:** 
- User base analysis
- Business requirements

**Hypothesis:** Personal drives only for MVP, shared drives in future iteration

## Rollback Plan

### Feature Flags
- **Environment Variable:** `ENABLE_GOOGLE_DRIVE_IMPORT=false`
- **Component Level:** Conditional rendering based on flag
- **API Level:** Early return if feature disabled

### Kill Switch
- **Immediate:** Disable feature flag
- **API Protection:** Rate limiting to zero
- **User Communication:** Graceful degradation message

### Data Cleanup
- **Files:** Automated cleanup of imported files
- **Tokens:** Revoke OAuth tokens
- **Database:** Remove import records

## Success Metrics

### Technical Metrics
- **Import Success Rate:** >95% for supported file types
- **Processing Time:** <30 seconds for typical files
- **Error Rate:** <5% for valid file selections

### User Experience Metrics
- **Adoption Rate:** % of users who use Drive import vs. manual upload
- **Completion Rate:** % of Drive imports that complete successfully
- **User Satisfaction:** Feedback on import flow usability

### Business Metrics
- **Conversion Impact:** Effect on booking completion rates
- **Support Tickets:** Reduction in file-related support requests
- **Time Savings:** Reduced manual file handling time

## Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- OAuth setup and testing
- Basic Picker integration
- Server API skeleton

### Phase 2: Core Functionality (Week 3-4)
- File export and download
- Storage implementation
- Basic error handling

### Phase 3: Enhancement (Week 5-6)
- Text extraction pipeline
- Status UI improvements
- Comprehensive testing

### Phase 4: Production (Week 7-8)
- Security audit
- Performance optimization
- Documentation and training

