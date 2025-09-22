"use client";

import { useState } from "react";
import { QUESTIONS, SERVICES, TIEBREAK_ORDER, ServiceKey } from "@/config/serviceQuiz";
import { CTAButton } from "./CTAButton";

export default function ServiceQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ServiceKey | null>(null);

  const currentQuestion = QUESTIONS[currentStep];
  const selectedOption = answers[currentQuestion.id];

  const handleOptionSelect = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const winner = calculateResult();
      setResult(winner);
      
      // Track quiz completion for business intelligence
      trackQuizCompletion(winner);
    }
  };

  const trackQuizCompletion = (result: ServiceKey) => {
    // Track with Plausible Analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Quiz Completed', {
        props: { 
          service: result,
          serviceName: SERVICES[result].title,
          price: SERVICES[result].price
        }
      });
    }

    // Store result for booking system context
    try {
      localStorage.setItem('quizRecommendation', JSON.stringify({
        serviceId: result,
        serviceName: SERVICES[result].title,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.warn('Could not store quiz result in localStorage:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedOption) {
      handleNext();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = currentQuestion.options.findIndex(opt => opt.id === selectedOption);
      
      if (e.key === 'ArrowDown') {
        const nextIndex = Math.min(currentIndex + 1, currentQuestion.options.length - 1);
        handleOptionSelect(currentQuestion.options[nextIndex].id);
      } else {
        const prevIndex = Math.max(currentIndex - 1, 0);
        handleOptionSelect(currentQuestion.options[prevIndex].id);
      }
    }
  };

  const calculateResult = (): ServiceKey => {
    // Initialize scores
    const scores: Record<ServiceKey, number> = {
      consult: 0,
      resume: 0,
      accelerator: 0,
      mentorship: 0
    };

    // Sum weights from selected options
    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = QUESTIONS.find(q => q.id === questionId);
      const option = question?.options.find(o => o.id === optionId);
      
      if (option?.weights) {
        Object.entries(option.weights).forEach(([serviceKey, weight]) => {
          scores[serviceKey as ServiceKey] += weight;
        });
      }
    });

    // Find highest score
    const maxScore = Math.max(...Object.values(scores));
    const tiedServices = Object.entries(scores)
      .filter(([_, score]) => score === maxScore)
      .map(([serviceKey]) => serviceKey as ServiceKey);

    // Apply tiebreakers
    if (tiedServices.length === 1) {
      return tiedServices[0];
    }

    // Tiebreaker 1: Most signal on Q1 (challenge)
    const challengeWeights: Record<ServiceKey, number> = {
      consult: 0,
      resume: 0,
      accelerator: 0,
      mentorship: 0
    };

    const challengeAnswer = answers.challenge;
    if (challengeAnswer) {
      const challengeQuestion = QUESTIONS.find(q => q.id === 'challenge');
      const challengeOption = challengeQuestion?.options.find(o => o.id === challengeAnswer);
      
      if (challengeOption?.weights) {
        Object.entries(challengeOption.weights).forEach(([serviceKey, weight]) => {
          challengeWeights[serviceKey as ServiceKey] = weight;
        });
      }
    }

    const maxChallengeWeight = Math.max(...tiedServices.map(s => challengeWeights[s]));
    const challengeTiedServices = tiedServices.filter(s => challengeWeights[s] === maxChallengeWeight);

    if (challengeTiedServices.length === 1) {
      return challengeTiedServices[0];
    }

    // Tiebreaker 2: Service with "Most Popular" badge
    const popularService = challengeTiedServices.find(s => SERVICES[s].badge === "Most Popular");
    if (popularService) {
      return popularService;
    }

    // Tiebreaker 3: Alphabetical by title
    return challengeTiedServices.sort((a, b) => SERVICES[a].title.localeCompare(SERVICES[b].title))[0];
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    const service = SERVICES[result];
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-navy-900 mb-2">
            Perfect Match!
          </h3>
          <p className="text-gray-600">
            Based on your answers, we recommend:
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 mb-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary-100 to-primary-200 rounded-full translate-y-8 -translate-x-8 opacity-50"></div>
          
          <div className="relative z-10 text-center">
            {service.badge && (
              <div className="inline-flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-bold px-3 py-1.5 rounded-full mb-4 shadow-md">
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {service.badge}
              </div>
            )}
            <h4 className="text-xl font-bold text-navy-900 mb-2">
              {service.title}
            </h4>
            <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 text-base font-bold px-4 py-2 rounded-lg mb-4">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {service.price}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {service.blurb}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton 
                href={service.slug}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See details
              </CTAButton>
              <CTAButton 
                href="/book"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book now
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold underline transition-colors duration-200 text-sm"
          >
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Take quiz again
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div 
      className="max-w-xl mx-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-navy-900 mb-1">
          Which Service is Right for You?
        </h2>
        <p className="text-sm text-gray-600">
          Help us recommend the best option based on your specific needs
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>{currentStep + 1} of {QUESTIONS.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full -translate-y-8 translate-x-8 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-primary-100 to-primary-200 rounded-full translate-y-6 -translate-x-6 opacity-50"></div>
        
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-navy-900 mb-6 text-center leading-relaxed">
            {currentQuestion.prompt}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <label
                key={option.id}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.01] ${
                  selectedOption === option.id
                    ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-md scale-[1.01]'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50 shadow-sm hover:shadow-md'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => handleOptionSelect(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                      selectedOption === option.id
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-navy-900 leading-relaxed">{option.label}</span>
                  </div>
                  {selectedOption === option.id && (
                    <div className="text-primary-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform ${
                selectedOption
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep < QUESTIONS.length - 1 ? (
                <>
                  Next
                  <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Get Recommendation
                  <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
