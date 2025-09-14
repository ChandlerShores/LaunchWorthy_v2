import React from 'react';
import { ContactInfo } from '@/hooks/useBookingFlow';

/**
 * Safely encodes Calendly parameters to prevent URL issues
 */
const encodeCalendlyParam = (value: string): string => {
  if (!value?.trim()) return '';
  
  // Handle common edge cases
  const cleaned = value.trim()
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .replace(/[^\w\s\-\.@\+]/g, ''); // Remove problematic characters
  
  return cleaned; // Don't double-encode, URLSearchParams will handle encoding
};

/**
 * Builds a secure Calendly URL with contact prefill
 */
export const buildCalendlyUrl = (baseUrl: string, contactInfo: ContactInfo) => {
  try {
    if (!baseUrl?.trim()) {
      throw new Error('Calendly base URL is required');
    }

    // Use the base URL as-is since we now have the correct format
    let finalBaseUrl = baseUrl;
    
    // For embeds, sometimes we need to ensure we're using the right URL format
    // Remove any trailing slashes and ensure we have the base event URL
    finalBaseUrl = finalBaseUrl.replace(/\/$/, '');

    const params = new URLSearchParams();
    
    // Track what we're pre-filling
    const prefilledFields: string[] = [];
    
    // Sanitize and add contact information
    if (contactInfo.name?.trim()) {
      const name = contactInfo.name.trim().substring(0, 100); // Limit length
      params.set('name', encodeCalendlyParam(name));
      prefilledFields.push('name');
    }
    
    if (contactInfo.email?.trim()) {
      const email = contactInfo.email.trim().toLowerCase();
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        params.set('email', email);
        prefilledFields.push('email');
      }
    }
    
    if (contactInfo.phone?.trim()) {
      // Clean phone number (preserve + and digits)
      const phoneCleaned = contactInfo.phone
        .replace(/[^\d\+\-\(\)\s]/g, '')
        .trim();
      if (phoneCleaned) {
        params.set('phone', phoneCleaned);
        prefilledFields.push('phone');
      }
    }
    
    // Add only essential Calendly parameters for prefill
    params.set('hide_guest_details', '1');
    
    const url = `${finalBaseUrl}?${params.toString()}`;
    
    // Debug logging
    console.log('Calendly URL Debug:', {
      baseUrl,
      params: params.toString(),
      finalUrl: url,
      prefilledFields,
      contactInfo
    });
    
    return {
      url,
      prefilledFields,
      hasAllFields: prefilledFields.length === 3,
      success: true,
      error: null
    };
  } catch (error) {
    console.error('Calendly URL construction failed:', error);
    return {
      url: baseUrl || '',
      prefilledFields: [],
      hasAllFields: false,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Hook for managing Calendly integration with error handling
 */
export const useCalendlyIntegration = (contactInfo: ContactInfo) => {
  const [calendlyState, setCalendlyState] = React.useState({
    isLoading: true,
    hasError: false,
    prefilledFields: [] as string[],
    fallbackMode: false,
    error: null as string | null
  });
  
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  
  const calendlyUrl = React.useMemo(() => {
    if (!baseUrl) {
      setCalendlyState(prev => ({
        ...prev,
        hasError: true,
        fallbackMode: true,
        error: 'Calendly URL not configured'
      }));
      return '';
    }
    
    const result = buildCalendlyUrl(baseUrl, contactInfo);
    
    setCalendlyState(prev => ({
      ...prev,
      hasError: !result.success,
      prefilledFields: result.prefilledFields,
      error: result.error,
      fallbackMode: !result.success
    }));
    
    return result.url;
  }, [baseUrl, contactInfo.name, contactInfo.email, contactInfo.phone]);
  
  const retry = React.useCallback(() => {
    setCalendlyState(prev => ({ ...prev, hasError: false, error: null }));
  }, []);
  
  return {
    calendlyUrl,
    ...calendlyState,
    hasAllFields: calendlyState.prefilledFields.length === 3,
    retry,
    baseUrl
  };
};

