'use client';

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import useBookingFlow from '@/hooks/useBookingFlow';
import BookingStep1 from './BookingStep1';
import BookingStep2 from './BookingStep2';
import BookingStep3 from './BookingStep3';

const BookingFlow: React.FC = () => {
  const searchParams = useSearchParams();
  const bookingFlowRef = useRef<HTMLDivElement>(null);
  
  const {
    currentStep,
    contactInfo,
    selectedService,
    selectedServiceData,
    paymentSessionId,
    isProcessing,
    errors,
    updateContactInfo,
    setSelectedService,
    setPaymentSessionId,
    setProcessing,
    nextStep,
    prevStep,
    goToStep,
    validateStep1,
    checkStep1Valid,
    clearSavedState,
  } = useBookingFlow();

  // Handle URL parameters for redirect from payment success
  useEffect(() => {
    const step = searchParams.get('step');
    const sessionId = searchParams.get('session_id');
    
    if (step === '3' && sessionId) {
      // Coming from payment success - go directly to Step 3
      setPaymentSessionId(sessionId);
      goToStep(3);
      
      // Scroll to booking flow when returning from payment
      setTimeout(() => {
        if (bookingFlowRef.current) {
          const headerHeight = 80;
          const elementPosition = bookingFlowRef.current.offsetTop;
          const offsetPosition = elementPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200); // Longer delay for payment return
    }
  }, [searchParams, setPaymentSessionId, goToStep]);

  // Scroll to booking flow when step changes (except on initial load)
  useEffect(() => {
    if (bookingFlowRef.current && currentStep > 1) {
      // Use requestAnimationFrame to ensure DOM has updated
      const scrollToBookingFlow = () => {
        if (bookingFlowRef.current) {
          const headerHeight = 80; // Approximate header height
          const elementPosition = bookingFlowRef.current.offsetTop;
          const offsetPosition = elementPosition - headerHeight - 20; // Extra 20px padding

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

      // Wait for next frame to ensure content is rendered
      requestAnimationFrame(() => {
        setTimeout(scrollToBookingFlow, 100);
      });
    }
  }, [currentStep]);

  const handleStep1Next = () => {
    if (validateStep1()) {
      nextStep();
      // Scroll to booking flow after DOM updates with new step content
      setTimeout(() => {
        if (bookingFlowRef.current) {
          const headerHeight = 80;
          const elementPosition = bookingFlowRef.current.offsetTop;
          const offsetPosition = elementPosition - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200); // Increased delay to ensure step 2 content is rendered
    }
  };

  const handlePaymentSuccess = async (sessionId: string) => {
    setPaymentSessionId(sessionId);
    
    // Payment successful - proceed to Step 3
    // Formspree submission will happen in Step 3 with complete data
    console.log('Payment successful, proceeding to booking completion step');
    nextStep();
  };

  const handleBookingComplete = () => {
    // Clear saved state and redirect to success page
    clearSavedState();
    window.location.href = '/success?booking_completed=true';
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingStep1
            contactInfo={contactInfo}
            selectedService={selectedService}
            errors={errors}
            onContactInfoChange={updateContactInfo}
            onServiceSelect={setSelectedService}
            onNext={handleStep1Next}
            checkStep1Valid={checkStep1Valid}
          />
        );

      case 2:
        if (!selectedService || !selectedServiceData) {
          // This shouldn't happen, but fallback to step 1
          return null;
        }
        return (
          <BookingStep2
            contactInfo={contactInfo}
            selectedService={selectedService}
            selectedServiceData={selectedServiceData}
            paymentSessionId={paymentSessionId}
            isProcessing={isProcessing}
            onProcessingChange={setProcessing}
            onPaymentSuccess={handlePaymentSuccess}
            onPrev={prevStep}
          />
        );

      case 3:
        if (!paymentSessionId) {
          // No payment session ID - fallback to step 1
          return null;
        }
        return (
          <BookingStep3
            contactInfo={contactInfo}
            selectedService={selectedService}
            paymentSessionId={paymentSessionId}
            onComplete={handleBookingComplete}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div ref={bookingFlowRef} className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {/* Step 1 */}
          <div className={`flex items-center ${currentStep >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium hidden sm:block">Contact Info</span>
          </div>

          {/* Connector */}
          <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>

          {/* Step 2 */}
          <div className={`flex items-center ${currentStep >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium hidden sm:block">Payment</span>
          </div>

          {/* Connector */}
          <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>

          {/* Step 3 */}
          <div className={`flex items-center ${currentStep >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium hidden sm:block">Schedule</span>
          </div>
        </div>

        {/* Step Labels for Mobile */}
        <div className="flex justify-between mt-2 sm:hidden">
          <span className={`text-xs ${currentStep >= 1 ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
            Contact
          </span>
          <span className={`text-xs ${currentStep >= 2 ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
            Payment
          </span>
          <span className={`text-xs ${currentStep >= 3 ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
            Schedule
          </span>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-white rounded-xl shadow-lg border border-navy-200 p-8">
        {renderCurrentStep()}
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need help? Contact us at{' '}
          <a href="mailto:hello@launchworthy.net" className="text-primary-600 hover:text-primary-700 underline">
            hello@launchworthy.net
          </a>
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Your booking progress is automatically saved
        </p>
      </div>
    </div>
  );
};

export default BookingFlow;
