'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useATSOptimizerFlow } from '@/hooks/useATSOptimizerFlow';
import OptimizerStep1 from './OptimizerStep1';
import OptimizerStep2 from './OptimizerStep2';
import OptimizerStep3 from './OptimizerStep3';
import OptimizerStep4 from './OptimizerStep4';
import OptimizerResults from './OptimizerResults';
import UsageLimitModal from './UsageLimitModal';
import { canUseOptimizer, recordUsage, addCredits, resetUsageData, getRemainingCredits } from '@/lib/optimizer-usage';
import { validateRewriteInput, rewriteBullets } from '@/lib/rewrite';
import { RateLimitError, RewriteApiSuccess } from '@/types/rewrite';
import OptimizerRewriteResults from './OptimizerRewriteResults';

export default function ATSOptimizerFlow() {
  const searchParams = useSearchParams();
  const {
    currentStep,
    bullets,
    editedBullets,
    jdText,
    parsedJD,
    settings,
    jobId,
    results,
    isProcessing,
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
    nextStep,
    prevStep,
    goToStep,
    clearSavedState,
  } = useATSOptimizerFlow();

  const [showUsageModal, setShowUsageModal] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);
  const showDevTools = process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_DEV_TOOLS === '1';
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRemaining(getRemainingCredits());
    }
  }, [currentStep, isProcessing]);

  // Handle payment success return
  useEffect(() => {
    const sessionId = searchParams?.get('session_id');
    const paymentSuccess = searchParams?.get('payment_success');

    if (sessionId && paymentSuccess === 'true') {
      // Add credits after successful payment
      addCredits(5);
      
      // Show success message
      console.log('Payment successful! 5 credits added.');
      
      // Clear URL parameters
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [searchParams]);

  // Handle Step 1 completion
  const handleStep1Complete = (bullets: string[]) => {
    setBullets(bullets);
    nextStep();
  };

  // Handle Step 4 submission
  const handleSubmit = async () => {
    // Check usage limits
    const usage = canUseOptimizer();
    
    if (!usage.allowed && usage.requiresPayment) {
      setShowUsageModal(true);
      return;
    }

    // Client-side limits guard (mirror server validation)
    try {
      validateRewriteInput({
        job_description: jdText,
        resume_bullets: editedBullets,
        params: {
          // We are not wiring these UI settings to params yet, keep defaults
        },
      });
    } catch (e: any) {
      alert(e?.message || 'Please fix input errors before submitting.');
      return;
    }

    // Respect temporary cooldown if previously rate limited
    if (rateLimitedUntil && Date.now() < rateLimitedUntil) {
      setRateLimitMessage('You’ve hit the limit. Please wait a minute and try again.');
      return;
    } else {
      setRateLimitMessage(null);
    }

    // Proceed with optimization
    await submitOptimization();
  };

  // Submit optimization request
  const submitOptimization = async () => {
    setProcessing(true);

    try {
      // Call new rewrite proxy directly
      const result = (await rewriteBullets({
        job_description: jdText,
        resume_bullets: editedBullets,
        params: {
          // Map basic settings to API params where applicable
          target_tense: 'past',
          max_words_per_bullet: Math.min(Math.max(settings.maxLen, 6), 60),
          seniority_hint: 'IC mid',
          api_version: '1.0.0',
          prompt_version: '1.0.0',
        },
      })) as RewriteApiSuccess;

      // Record usage (client-side credit tracking)
      recordUsage();

      // Store results directly and move to step 5 (direct results mode)
      setResults(result);
      setJobId(null);
      nextStep();
    } catch (error: any) {
      if (error instanceof RateLimitError) {
        setRateLimitMessage(error.message || 'Rate limit exceeded. Please try again later.');
        setRateLimitedUntil(Date.now() + 60_000);
        return;
      }
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit optimization. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Handle payment for additional credits
  const handlePurchase = async () => {
    // Stripe checkout will be handled in UsageLimitModal
    // After payment, user will be redirected back with credits
    // The useEffect above will handle adding credits
    console.log('Payment initiated via modal');
  };

  // Handle start over
  const handleStartOver = () => {
    clearSavedState();
    goToStep(1);
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OptimizerStep1 onComplete={handleStep1Complete} />;

      case 2:
        return (
          <OptimizerStep2
            bullets={bullets}
            editedBullets={editedBullets}
            onUpdate={updateBullet}
            onAdd={addBullet}
            onRemove={removeBullet}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 3:
        return (
          <OptimizerStep3
            jdText={jdText}
            parsedJD={parsedJD}
            onJDChange={setJDText}
            onParsedJDUpdate={setParsedJD}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 4:
        return (
          <OptimizerStep4
            bulletCount={editedBullets.length}
            parsedJD={parsedJD}
            settings={settings}
            onSettingsUpdate={updateSettings}
            onSubmit={handleSubmit}
            onPrev={prevStep}
            isProcessing={isProcessing}
          />
        );

      case 5:
        return jobId
          ? <OptimizerResults jobId={jobId} onStartOver={handleStartOver} />
          : results
            ? <OptimizerRewriteResults data={results as any} onStartOver={handleStartOver} />
            : null;

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Dev Tools (local/dev only) */}
      {showDevTools && (
        <div className="mb-4 flex items-center justify-between rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-2">
          <div className="text-xs text-gray-600">
            Dev Tools — Remaining: {remaining ?? '—'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                addCredits(5);
                setRemaining(getRemainingCredits());
              }}
              className="rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white hover:bg-gray-700"
            >
              Add 5 credits
            </button>
            <button
              onClick={() => {
                resetUsageData();
                setRemaining(getRemainingCredits());
              }}
              className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
            >
              Reset usage
            </button>
          </div>
        </div>
      )}
      {/* Rate Limit Banner */}
      {rateLimitMessage && (
        <div className="mb-4 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          {rateLimitMessage}
        </div>
      )}
      {/* Progress Indicator (only show for steps 1-4) */}
      {currentStep <= 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={step}>
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                      ${
                        currentStep >= step
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {step}
                  </div>
                  <span
                    className={`
                      mt-2 text-xs font-medium hidden sm:block
                      ${currentStep >= step ? 'text-primary-600' : 'text-gray-400'}
                    `}
                  >
                    {step === 1 && 'Bullets'}
                    {step === 2 && 'Review'}
                    {step === 3 && 'Job Desc'}
                    {step === 4 && 'Submit'}
                  </span>
                </div>

                {/* Connector Line */}
                {index < 3 && (
                  <div
                    className={`
                      w-16 sm:w-24 h-1 mx-2 transition-all
                      ${currentStep > step ? 'bg-primary-600' : 'bg-gray-300'}
                    `}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
        {renderStep()}
      </div>

      {/* Auto-save indicator (only show for steps 2-4) */}
      {currentStep >= 2 && currentStep <= 4 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            <svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Your progress is automatically saved
          </p>
        </div>
      )}

      {/* Usage Limit Modal */}
      <UsageLimitModal
        isOpen={showUsageModal}
        onClose={() => setShowUsageModal(false)}
        onPurchase={handlePurchase}
      />
    </div>
  );
}

