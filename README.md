# Launchworthy - Interview Coaching Website

A modern, high-conversion marketing site for interview coaching services built with Next.js 14, TypeScript, and Tailwind CSS. Features a complete booking flow with Stripe payments and Calendly integration.

## 🚀 Features

- **Complete Booking Flow** - 3-step process: Contact → Payment → Schedule
- **Alternative Booking System** - Single-page BookingWidget component
- **Integrated Payments** - Stripe Checkout with dynamic session creation
- **Smart Calendly Integration** - Pre-filled contact information and guest details hidden
- **Test Mode Indicators** - Visual indicators for development/testing
- **Custom Icon System** - Scalable SVG icon components
- **Section Layout System** - Consistent page layout wrapper
- **Badge System** - Service popularity indicators
- **High-conversion design** with mobile-first approach
- **Multiple service offerings** with clear pricing and CTAs
- **SEO optimized** with Next.js built-in metadata and JSON-LD schema
- **Analytics ready** with Plausible integration
- **Accessible** with WCAG 2.2 AA compliance
- **Fast performance** with Lighthouse scores ≥90

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components (no external UI library)
- **SEO**: Next.js built-in metadata API
- **Analytics**: Plausible
- **Payments**: Stripe Checkout (dynamic sessions)
- **Booking**: Calendly (iframe with prefill)
- **Forms**: Formspree
- **State Management**: React Hooks + localStorage
- **Deployment**: Vercel

## 🏗 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (site)/                   # Main site routes
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── services/             # Service pages
│   │   ├── book/                 # Booking flow
│   │   │   ├── layout.tsx        # Booking page metadata
│   │   │   └── page.tsx          # Booking flow container
│   │   ├── success/              # Payment success page
│   │   ├── about/                # About page
│   │   ├── faq/                  # FAQ page
│   │   └── contact/              # Contact page
│   ├── api/                      # API routes
│   │   ├── create-checkout-session/ # Stripe Checkout API
│   │   ├── submit-booking-formspree/ # Booking completion API
│   │   ├── sitemap/              # XML sitemap generation
│   │   └── robots.txt/           # Robots.txt generation
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── booking/                  # Booking flow components
│   │   ├── BookingFlow.tsx       # Main booking container
│   │   ├── BookingStep1.tsx      # Contact info & service selection
│   │   ├── BookingStep2.tsx      # Payment processing
│   │   └── BookingStep3.tsx      # Scheduling & file upload
│   ├── BookingWidget.tsx         # Alternative single-page booking
│   ├── Badge.tsx                 # Service popularity badges
│   ├── CTAButton.tsx             # Call-to-action button component
│   ├── Icon.tsx                  # Custom SVG icon system
│   ├── Section.tsx               # Layout wrapper component
│   ├── TestModeIndicator.tsx     # Payment test mode indicator
│   ├── Header.tsx                # Site header
│   ├── Footer.tsx                # Site footer
│   ├── Hero.tsx                  # Hero sections
│   ├── ServiceCard.tsx           # Service cards
│   ├── TestimonialCard.tsx       # Testimonial cards
│   ├── FAQ.tsx                   # FAQ accordion (custom implementation)
│   ├── Analytics.tsx             # Analytics script
│   └── Schema.tsx                # JSON-LD schema
├── hooks/                        # Custom React hooks
│   └── useBookingFlow.ts         # Booking state management
├── lib/                          # Utilities
│   ├── calendly.ts               # Calendly integration with prefill
│   ├── stripe.ts                 # Stripe configuration & pricing
│   ├── metadata.ts               # SEO metadata
│   ├── schema.ts                 # Schema.org data
│   └── utils.ts                  # Helper functions
└── styles/                       # Additional styles
    └── prose.css                 # Typography styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd launchworthy
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp env.local.example .env.local
```

4. **Update `.env.local` with your actual values:**
```env
# Stripe Configuration (Required for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Calendly Integration (Required for booking)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min

# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=launchworthy.net

# Forms (Required for booking completion)
NEXT_PUBLIC_CONTACT_FORMSPREE_URL=https://formspree.io/f/your-form-id
NEXT_PUBLIC_BOOKING_FORMSPREE_URL=https://formspree.io/f/your-booking-form-id
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 💰 Services & Pricing

1. **30-min Career Consult** - $50
   - Quick resume, LinkedIn, and interview style review
   - 2-3 actionable fixes

2. **Resume + LinkedIn Polish** - $125
   - Comprehensive optimization and alignment
   - Includes walkthrough call

3. **Stop Getting Ghosted** - $300
   - Baseline mock → coaching → final mock
   - Recordings and detailed notes

4. **Monthly Mentorship** - $150/mo
   - Two 30-min sessions per month
   - Ongoing support and accountability

## 🔄 Alternative Booking System

The site includes a `BookingWidget` component that provides a single-page booking experience:

- **Direct Payment** - Immediate Stripe checkout without multi-step flow
- **Calendly Embed** - Inline scheduling widget
- **Service Selection** - Radio button interface for service selection
- **Test Mode Indicators** - Visual indicators for development
- **Session Preparation** - Built-in checklist for users

This component can be used for A/B testing or as an alternative to the 3-step flow.

## 🛡️ Middleware

The site includes maintenance mode middleware (`src/middleware.ts`):

- **Development Mode**: Allows all traffic to pass through
- **Production Mode**: Blocks traffic with 503 "Site offline for maintenance" status
- **Configuration**: Controlled by `NODE_ENV` environment variable
- **Matcher**: Applies to all routes except API, static files, and favicon

To disable maintenance mode, modify the middleware function.

## 🔄 Booking Flow

The site features a sophisticated 3-step booking process:

### Step 1: Contact & Service Selection
- Collect contact information (name, email, phone)
- Service selection with pricing display
- LinkedIn URL validation (optional)
- Real-time form validation

### Step 2: Payment Processing
- Stripe Checkout integration
- Dynamic pricing based on service selection
- Test mode indicators for development
- Success/error handling

### Step 3: Scheduling & Completion
- **Calendly integration with prefill** - Contact info automatically populated
- **Formspree submission** - Booking data sent to Formspree
- **Booking completion confirmation** - Success page redirect

## 🔧 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ Yes | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ Yes | `sk_test_...` |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly booking URL | ✅ Yes | `https://calendly.com/username/30min` |
| `NEXT_PUBLIC_BOOKING_FORMSPREE_URL` | Booking completion form URL | ✅ Yes | `https://formspree.io/f/...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ⚠️ Optional | `whsec_...` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Analytics domain | ⚠️ Optional | `launchworthy.net` |
| `NEXT_PUBLIC_CONTACT_FORMSPREE_URL` | Formspree contact form URL | ⚠️ Optional | `https://formspree.io/f/...` |

## 💳 Payment Integration

This site uses **Stripe Checkout** for secure payment processing:

- **Dynamic checkout sessions** created via API routes
- **Real-time pricing** based on service selection
- **Email pre-filling** for better UX
- **Success/cancel handling** with proper redirects
- **Test mode ready** for development

### Testing Payments

**Test Mode is enabled when:**
- `NODE_ENV=development` (local development)
- `NEXT_PUBLIC_STRIPE_MODE=test` (explicit test mode)

**Test Card Numbers:**
- **Success:** `4242424242424242`
- **Decline:** `4000000000000002`
- **Insufficient Funds:** `4000000000009995`
- **Requires Authentication:** `4000002500003155`
- **Expired Card:** `4000000000000069`
- **Incorrect CVC:** `4000000000000127`

Use any future expiry date and any 3-digit CVC for testing.

## 📅 Calendly Integration

The booking flow includes sophisticated Calendly integration:

### Features
- **Contact Prefill** - Name, email, and phone automatically populated
- **Guest Details Hidden** - Removes "add guest" button for cleaner UX
- **Error Handling** - Graceful fallback if Calendly fails to load
- **Debug Mode** - Shows generated URL for troubleshooting

### Setup
1. **Create Calendly account** and set up your event types
2. **Use specific event URL** (not generic booking page):
   ```
   ✅ Good: https://calendly.com/username/30min
   ❌ Bad: https://calendly.com/username/book
   ```
3. **Add to environment variables**:
   ```env
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min
   ```

### Troubleshooting Calendly
- **Prefill not working?** Ensure you're using a specific event URL
- **Debug URL shows** - Click to test prefill in new tab
- **Check console logs** for detailed integration status

## 🚀 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
2. **Connect repository** to Vercel
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on push to main branch

### Environment Variables for Production

```env
# Stripe (Production)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Calendly (Production)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

## 🔍 SEO Features

- **Meta tags** optimized for each page
- **Open Graph** tags for social sharing
- **JSON-LD schema** for Organization, LocalBusiness, and FAQ
- **XML sitemap** auto-generated
- **Robots.txt** configured
- **Structured data** for better search visibility

## ⚡ Performance

- **Lighthouse Score**: 90+ on mobile and desktop
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component
- **Font Loading**: Inter font with display: swap
- **Code Splitting**: Automatic with Next.js

## ♿ Accessibility

- **WCAG 2.2 AA** compliant
- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus management** with visible focus rings
- **Alt text** for all images
- **ARIA labels** for interactive elements

## 🐛 Troubleshooting

### FAQ Component Issues

**"Module not found: Can't resolve '@radix-ui/react-accordion'":**
- The FAQ component uses a custom implementation, not Radix UI
- This error occurs if the component was previously using Radix UI
- Current implementation works without external dependencies

### Booking Completion Issues

**"Booking Formspree URL not configured":**
- Add `NEXT_PUBLIC_BOOKING_FORMSPREE_URL` to environment variables
- This is required for the booking completion step
- Without it, users can pay but booking data won't be captured

### Middleware Issues

**Site shows "Site offline for maintenance":**
- Check `NODE_ENV` environment variable
- In production, middleware blocks all traffic
- In development, traffic is allowed through

### Payment Issues

**"Something went wrong" error:**
- Check that `.env.local` exists (not `env.local`)
- Verify Stripe API keys are correct
- Restart dev server after adding environment variables
- Check browser console for detailed error messages

### Calendly Issues

**Prefill not working:**
- Ensure you're using a specific event URL (not generic booking page)
- Check that contact information is being passed correctly
- Look at debug URL in Step 3 of booking flow
- Verify Calendly event allows prefill parameters

**Infinite re-render errors:**
- Clear `.next` directory: `Remove-Item -Recurse -Force .next`
- Restart development server
- Check for circular dependencies in hooks

### Build Issues

**"Stripe not configured" error:**
- Add `STRIPE_SECRET_KEY` to environment variables
- Restart development server
- Check that `.env.local` file exists and is properly formatted

### Environment Variables Not Loading

- Ensure file is named `.env.local` (with dot prefix)
- Restart Next.js development server
- Check file is in project root directory
- Verify no spaces around `=` in environment variables

## 📞 Support

For questions or support, contact hello@launchworthy.net

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**