'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { isTestMode, testCards } from '@/lib/stripe';

const testModeVariants = cva(
  'rounded-lg p-4',
  {
    variants: {
      variant: {
        default: 'bg-warning-50 border border-warning-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface TestModeIndicatorProps extends VariantProps<typeof testModeVariants> {
  className?: string;
}

const TestModeIndicator: React.FC<TestModeIndicatorProps> = ({ className = '', variant }) => {
  const [showTestCards, setShowTestCards] = useState(false);

  if (!isTestMode) {
    return null;
  }

  return (
    <div className={cn(testModeVariants({ variant }), className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-warning-500 rounded-full mr-2"></div>
          <h3 className="text-sm font-semibold text-warning-800">Test Mode</h3>
        </div>
        <button
          type="button"
          onClick={() => setShowTestCards(!showTestCards)}
          className="text-xs text-warning-700 hover:text-warning-800 underline"
        >
          {showTestCards ? 'Hide' : 'Show'} Test Cards
        </button>
      </div>
      
      <p className="text-sm text-warning-700 mb-3">
        You're in test mode. Use the test card numbers below for payment testing.
      </p>

      {showTestCards && (
        <div className="bg-white border border-warning-200 rounded p-3">
          <h4 className="text-xs font-semibold text-gray-800 mb-2">Test Card Numbers:</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Success:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{testCards.success}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Decline:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{testCards.decline}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insufficient Funds:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{testCards.insufficientFunds}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Requires Auth:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{testCards.requiresAuthentication}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expired Card:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{testCards.expiredCard}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Incorrect CVC:</span>
              <code className="bg-gray-100 px-2 py-1 rounded text-gray-800">{testCards.incorrectCvc}</code>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-warning-200">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> Use any future expiry date and any 3-digit CVC for testing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestModeIndicator;
