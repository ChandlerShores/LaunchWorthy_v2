'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ServiceId, servicePrices } from '@/lib/stripe';

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface BookingState {
  currentStep: 1 | 2 | 3;
  contactInfo: ContactInfo;
  selectedService: ServiceId | null;
  paymentSessionId: string | null;
  isProcessing: boolean;
  errors: Record<string, string>;
}

const STORAGE_KEY = 'booking-flow-state';

const initialState: BookingState = {
  currentStep: 1,
  contactInfo: {
    name: '',
    email: '',
    phone: '',
  },
  selectedService: null,
  paymentSessionId: null,
  isProcessing: false,
  errors: {},
};

export const useBookingFlow = () => {
  const [state, setState] = useState<BookingState>(initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          // Only restore state if we're continuing from step 2 or 3
          // For step 1, always start fresh to prevent auto-selection
          if (parsed.currentStep > 1) {
            setState(prev => ({ ...prev, ...parsed }));
          }
          // If currentStep is 1, don't restore anything - start completely fresh
        } catch (error) {
          console.error('Failed to parse saved booking state:', error);
        }
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Clear saved state (useful for reset after completion)
  const clearSavedState = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState(initialState);
  }, []);

  // Navigation methods
  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(3, prev.currentStep + 1) as 1 | 2 | 3,
      errors: {},
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1) as 1 | 2 | 3,
      errors: {},
    }));
  }, []);

  const goToStep = useCallback((step: 1 | 2 | 3) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      errors: {},
    }));
  }, []);

  // Contact info methods
  const updateContactInfo = useCallback((updates: Partial<ContactInfo>) => {
    setState(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...updates },
      errors: {},
    }));
  }, []);

  // Service selection
  const setSelectedService = useCallback((serviceId: ServiceId | null) => {
    setState(prev => ({
      ...prev,
      selectedService: serviceId,
      errors: {},
    }));
  }, []);

  // Payment methods
  const setPaymentSessionId = useCallback((sessionId: string | null) => {
    setState(prev => ({
      ...prev,
      paymentSessionId: sessionId,
    }));
  }, []);

  const setProcessing = useCallback((processing: boolean) => {
    setState(prev => ({
      ...prev,
      isProcessing: processing,
    }));
  }, []);

  // Error handling
  const setError = useCallback((field: string, message: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: message },
    }));
  }, []);

  const clearError = useCallback((field: string) => {
    setState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field];
      return { ...prev, errors: newErrors };
    });
  }, []);

  // Validation check (doesn't update state)
  const checkStep1Valid = useCallback(() => {
    if (!state.contactInfo.name.trim()) return false;
    if (!state.contactInfo.email.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactInfo.email)) return false;
    if (!state.contactInfo.phone.trim()) return false;
    if (!/^\+?[\d\s\-\(\)]{10,}$/.test(state.contactInfo.phone.replace(/\s/g, ''))) return false;
    if (!state.selectedService) return false;
    return true;
  }, [state.contactInfo.name, state.contactInfo.email, state.contactInfo.phone, state.selectedService]);

  // Validation (updates state with errors)
  const validateStep1 = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!state.contactInfo.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!state.contactInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!state.contactInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(state.contactInfo.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!state.selectedService) {
      errors.service = 'Please select a service';
    }

    setState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  }, [state.contactInfo.name, state.contactInfo.email, state.contactInfo.phone, state.selectedService]);

  // Computed values - memoized to prevent unnecessary re-renders
  const selectedServiceData = useMemo(() => 
    state.selectedService ? servicePrices[state.selectedService] : null,
    [state.selectedService]
  );
  
  const canProceedToStep2 = useMemo(() => 
    state.currentStep === 1 && checkStep1Valid(),
    [state.currentStep, checkStep1Valid]
  );
  
  const canProceedToStep3 = useMemo(() => 
    state.currentStep === 2 && state.paymentSessionId !== null,
    [state.currentStep, state.paymentSessionId]
  );

  return {
    // State
    ...state,
    selectedServiceData,
    
    // Navigation
    nextStep,
    prevStep,
    goToStep,
    
    // Data updates
    updateContactInfo,
    setSelectedService,
    setPaymentSessionId,
    setProcessing,
    
    // Error handling
    setError,
    clearError,
    
    // Validation
    validateStep1,
    checkStep1Valid,
    canProceedToStep2,
    canProceedToStep3,
    
    // Utilities
    clearSavedState,
  };
};

export default useBookingFlow;
