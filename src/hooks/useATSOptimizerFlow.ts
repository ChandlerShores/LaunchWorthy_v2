'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ParsedJD } from '@/lib/jd-parser';

export interface OptimizerSettings {
  tone: 'professional' | 'concise' | 'dynamic';
  maxLen: number;
  variants: number;
}

export interface OptimizerState {
  currentStep: 1 | 2 | 3 | 4 | 5; // 5 is results
  
  // Step 1: Bullet input
  bullets: string[];
  editedBullets: string[]; // User-edited versions
  
  // Step 3: Job Description
  jdText: string;
  parsedJD: ParsedJD | null;
  
  // Step 4: Settings & submission
  settings: OptimizerSettings;
  
  // Step 5: Results
  jobId: string | null;
  results: any | null;
  
  // UI state
  isProcessing: boolean;
  errors: Record<string, string>;
}

const STORAGE_KEY = 'ats-optimizer-state';

const initialState: OptimizerState = {
  currentStep: 1,
  bullets: [],
  editedBullets: [],
  jdText: '',
  parsedJD: null,
  settings: {
    tone: 'professional',
    maxLen: 30,
    variants: 1,
  },
  jobId: null,
  results: null,
  isProcessing: false,
  errors: {},
};

export const useATSOptimizerFlow = () => {
  const [state, setState] = useState<OptimizerState>(initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          // Restore state but always reset isProcessing
          setState(prev => ({ ...prev, ...parsed, isProcessing: false }));
        } catch (error) {
          console.error('Failed to parse saved optimizer state:', error);
        }
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToPersist = {
        ...state,
        isProcessing: false, // Never persist processing state
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    }
  }, [state]);

  // Clear saved state
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
      currentStep: Math.min(5, prev.currentStep + 1) as 1 | 2 | 3 | 4 | 5,
      errors: {},
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1) as 1 | 2 | 3 | 4 | 5,
      errors: {},
    }));
  }, []);

  const goToStep = useCallback((step: 1 | 2 | 3 | 4 | 5) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      errors: {},
    }));
  }, []);

  // Step 1: Bullets
  const setBullets = useCallback((bullets: string[]) => {
    setState(prev => ({
      ...prev,
      bullets,
      editedBullets: bullets,
    }));
  }, []);

  const updateBullet = useCallback((index: number, text: string) => {
    setState(prev => {
      const newEditedBullets = [...prev.editedBullets];
      newEditedBullets[index] = text;
      return {
        ...prev,
        editedBullets: newEditedBullets,
      };
    });
  }, []);

  const addBullet = useCallback((text: string) => {
    setState(prev => ({
      ...prev,
      bullets: [...prev.bullets, text],
      editedBullets: [...prev.editedBullets, text],
    }));
  }, []);

  const removeBullet = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      bullets: prev.bullets.filter((_, i) => i !== index),
      editedBullets: prev.editedBullets.filter((_, i) => i !== index),
    }));
  }, []);

  // Step 3: Job Description
  const setJDText = useCallback((text: string) => {
    setState(prev => ({
      ...prev,
      jdText: text,
    }));
  }, []);

  const setParsedJD = useCallback((parsed: ParsedJD) => {
    setState(prev => ({
      ...prev,
      parsedJD: parsed,
    }));
  }, []);

  const updateParsedJD = useCallback((updates: Partial<ParsedJD>) => {
    setState(prev => ({
      ...prev,
      parsedJD: prev.parsedJD ? { ...prev.parsedJD, ...updates } : null,
    }));
  }, []);

  // Step 4: Settings
  const updateSettings = useCallback((updates: Partial<OptimizerSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  // Step 5: Results
  const setJobId = useCallback((jobId: string) => {
    setState(prev => ({
      ...prev,
      jobId,
    }));
  }, []);

  const setResults = useCallback((results: any) => {
    setState(prev => ({
      ...prev,
      results,
    }));
  }, []);

  // Processing state
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

  const clearAllErrors = useCallback(() => {
    setState(prev => ({ ...prev, errors: {} }));
  }, []);

  // Validation
  const canProceedFromStep1 = useMemo(() => {
    return state.bullets.length > 0;
  }, [state.bullets]);

  const canProceedFromStep2 = useMemo(() => {
    return state.editedBullets.length > 0 && state.editedBullets.every(b => b.trim().length > 0);
  }, [state.editedBullets]);

  const canProceedFromStep3 = useMemo(() => {
    return state.jdText.trim().length > 50; // At least 50 characters
  }, [state.jdText]);

  const canProceedFromStep4 = useMemo(() => {
    return (
      state.editedBullets.length > 0 &&
      state.jdText.trim().length > 0 &&
      !state.isProcessing
    );
  }, [state.editedBullets, state.jdText, state.isProcessing]);

  return {
    // State
    ...state,

    // Navigation
    nextStep,
    prevStep,
    goToStep,

    // Data updates
    setBullets,
    updateBullet,
    addBullet,
    removeBullet,
    setJDText,
    setParsedJD,
    updateParsedJD,
    updateSettings,
    setJobId,
    setResults,
    setProcessing,

    // Error handling
    setError,
    clearError,
    clearAllErrors,

    // Validation
    canProceedFromStep1,
    canProceedFromStep2,
    canProceedFromStep3,
    canProceedFromStep4,

    // Utilities
    clearSavedState,
  };
};

export default useATSOptimizerFlow;







