'use client';

import React, { useState } from 'react';
import { ServiceId } from '@/lib/stripe';
import { ContactInfo } from '@/hooks/useBookingFlow';
import { CTAButton } from '../CTAButton';
import Icon from '../Icon';
import { useCalendlyIntegration } from '@/lib/calendly';
import { servicePrices } from '@/lib/stripe';

// Helper functions to get service details
const getServiceDescription = (serviceId: ServiceId | null): string => {
  if (!serviceId || !servicePrices[serviceId]) return '';
  return servicePrices[serviceId].description || '';
};

const getServicePrice = (serviceId: ServiceId | null): number => {
  if (!serviceId || !servicePrices[serviceId]) return 0;
  return servicePrices[serviceId].price;
};

interface BookingStep3Props {
  contactInfo: ContactInfo;
  selectedService: ServiceId | null;
  paymentSessionId: string;
  onComplete: () => void;
}

const BookingStep3: React.FC<BookingStep3Props> = ({
  contactInfo,
  selectedService,
  paymentSessionId,
  onComplete,
}) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [linkedinError, setLinkedinError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the new Calendly integration with prefill
  const { 
    calendlyUrl, 
    prefilledFields, 
    hasAllFields, 
    hasError, 
    fallbackMode, 
    error,
    retry 
  } = useCalendlyIntegration(contactInfo);

  // Debug logging
  React.useEffect(() => {
    console.log('BookingStep3 Calendly Debug:', {
      contactInfo,
      calendlyUrl,
      prefilledFields,
      hasAllFields,
      hasError,
      fallbackMode,
      error
    });
  }, [contactInfo, calendlyUrl, prefilledFields, hasAllFields, hasError, fallbackMode, error]);

  // LinkedIn URL validation
  const validateLinkedInUrl = (url: string) => {
    if (!url.trim()) return true; // Optional field
    
    const linkedinUrlRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinUrlRegex.test(url);
  };

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLinkedinUrl(url);
    
    if (url.trim() && !validateLinkedInUrl(url)) {
      setLinkedinError('Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)');
    } else {
      setLinkedinError('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate we have all required data
      if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
        throw new Error('Missing required contact information');
      }
      
      if (!selectedService) {
        throw new Error('No service selected');
      }
      
      if (!paymentSessionId) {
        throw new Error('No payment session ID');
      }
      
      // Here you would typically upload files and save LinkedIn URL
      // For now, we'll just simulate the process
      
      if (uploadedFiles.length > 0) {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Send comprehensive booking data to Formspree
      try {
        const response = await fetch('/api/submit-booking-formspree', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Contact Information
            name: contactInfo.name,
            email: contactInfo.email,
            phone: contactInfo.phone,
            
            // Service Information
            serviceId: selectedService,
            serviceName: serviceName,
            serviceDescription: getServiceDescription(selectedService),
            servicePrice: getServicePrice(selectedService),
            
            // Payment Information
            paymentSessionId,
            paymentStatus: 'completed',
            
            // Additional Information
            linkedinUrl,
            uploadedFiles: uploadedFiles.length,
            
            // Booking Status
            status: 'booking_completed',
            submittedAt: new Date().toISOString(),
            bookingFlowVersion: '2.0',
          }),
        });

        if (response.ok) {
          console.log('Successfully submitted comprehensive booking data to Formspree');
        } else {
          const errorData = await response.text();
          console.error('Failed to submit booking data to Formspree:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          });
          // Don't block the user flow - they've already paid
        }
      } catch (error) {
        console.error('Error submitting to Formspree:', error);
        // Don't block the user flow - they've already paid
      }
      
      // Complete the booking process
      onComplete();
    } catch (error) {
      console.error('Error completing booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceName = selectedService ? 
    (selectedService === 'consult' ? '30-min Career Consult' :
     selectedService === 'resume' ? 'Resume + LinkedIn Polish' :
     selectedService === 'accelerator' ? 'Stop Getting Ghosted' :
     selectedService === 'mentorship' ? 'Monthly Mentorship' : 'Your Service') 
    : 'Your Service';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600">
          Complete your booking by scheduling and sharing your materials
        </p>
        <p className="text-lg font-medium text-primary-600 mt-2">
          Service: {serviceName}
        </p>
      </div>

      {/* Payment Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <Icon name="check" className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 text-lg">Payment Confirmed</h3>
            <p className="text-green-800 mt-1">
              Your payment has been processed successfully. You'll receive a confirmation email shortly.
            </p>
            <p className="text-green-700 text-sm mt-2">
              Session ID: <code className="bg-green-100 px-2 py-1 rounded text-xs">{paymentSessionId}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Your Session */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📅 Schedule Your Session
        </h3>
        <p className="text-gray-600 mb-6">
          Choose a time that works best for you. We recommend scheduling within the next week for optimal results.
        </p>
        
        {/* Prefill Status Notice */}
        {!hasAllFields && prefilledFields.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900">Information Pre-filled</h4>
                <p className="text-blue-800 text-sm mt-1">
                  We've pre-filled your {prefilledFields.join(', ')} in the booking form below. 
                  {!hasAllFields && ' You may need to enter any missing information.'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error Handling */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900">Calendly Integration Issue</h4>
                <p className="text-red-800 text-sm mt-1">
                  {fallbackMode 
                    ? 'Using basic Calendly embed. You may need to re-enter your contact information.'
                    : error || 'Unable to load Calendly. Please contact us directly to schedule your session.'
                  }
                </p>
                {fallbackMode && (
                  <button
                    onClick={retry}
                    className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
                  >
                    Try again
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Calendly Embed */}
        {calendlyUrl ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-4 p-3 bg-blue-50 rounded border">
              <p className="text-sm text-blue-800">
                <strong>Debug URL:</strong> <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">{calendlyUrl}</a>
              </p>
            </div>
            <iframe
              src={calendlyUrl}
              width="100%"
              height="600"
              frameBorder="0"
              title="Calendly Booking Widget"
              className="rounded-lg"
              loading="lazy"
              allow="camera; microphone; autoplay; encrypted-media; fullscreen; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              onError={() => {
                console.error('Calendly iframe failed to load');
              }}
              onLoad={() => {
                console.log('Calendly iframe loaded successfully');
              }}
            />
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="font-semibold text-yellow-900">Calendly Not Configured</h4>
                <p className="text-yellow-800 text-sm mt-1">
                  Calendly integration is not set up. Please contact us directly to schedule your session.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Documents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📄 Upload Your Resume
        </h3>
        <p className="text-gray-600 mb-6">
          Share your current resume so we can provide targeted feedback during your session.
        </p>
        
        <div className="space-y-4">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="resume-upload" className="cursor-pointer">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 font-medium">Click to upload resume</p>
              <p className="text-gray-500 text-sm mt-1">PDF, DOC, or DOCX (Max 10MB each)</p>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <Icon name="document" className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Icon name="x" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LinkedIn Profile */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          💼 LinkedIn Profile
        </h3>
        <p className="text-gray-600 mb-6">
          Share your LinkedIn profile URL so we can review your professional presence and provide targeted advice.
        </p>
        
        <div>
          <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile URL
          </label>
          <input
            type="url"
            id="linkedin-url"
            value={linkedinUrl}
            onChange={handleLinkedInChange}
            placeholder="https://linkedin.com/in/your-profile"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              linkedinError ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {linkedinError && (
            <p className="text-red-600 text-sm mt-2">{linkedinError}</p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            This helps us provide more personalized feedback on your professional brand.
          </p>
        </div>
      </div>

      {/* Complete Booking Button */}
      <div className="flex justify-center">
        <CTAButton
          onClick={handleComplete}
          disabled={isSubmitting}
          className="px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Completing...
            </>
          ) : (
            'Complete Booking'
          )}
        </CTAButton>
      </div>

      {/* Next Steps Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-4">What Happens Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium text-blue-900">Confirmation Email</p>
              <p className="text-blue-800 text-sm">You'll receive a detailed confirmation with session details</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium text-blue-900">Preparation Materials</p>
              <p className="text-blue-800 text-sm">We'll send you a preparation checklist and any relevant materials</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium text-blue-900">Your Session</p>
              <p className="text-blue-800 text-sm">Join your scheduled session and start transforming your interview skills!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;
