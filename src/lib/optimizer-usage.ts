/**
 * Usage tracking for ATS Optimizer (Freemium model)
 * First use is free, subsequent uses require payment
 */

const USAGE_KEY = 'ats-optimizer-usage';
const CREDITS_KEY = 'ats-optimizer-credits';

export interface UsageData {
  freeUsed: boolean;
  freeUsedAt?: string;
  paidCredits: number;
  lastUsedAt?: string;
  totalUses: number;
}

/**
 * Get current usage data
 */
export function getUsageData(): UsageData {
  if (typeof window === 'undefined') {
    return {
      freeUsed: false,
      paidCredits: 0,
      totalUses: 0,
    };
  }

  try {
    const stored = localStorage.getItem(USAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to read usage data:', error);
  }

  return {
    freeUsed: false,
    paidCredits: 0,
    totalUses: 0,
  };
}

/**
 * Check if user can use the optimizer
 */
export function canUseOptimizer(): {
  allowed: boolean;
  requiresPayment: boolean;
  message?: string;
} {
  const usage = getUsageData();

  // First use is always free
  if (!usage.freeUsed) {
    return {
      allowed: true,
      requiresPayment: false,
    };
  }

  // Check if user has paid credits
  if (usage.paidCredits > 0) {
    return {
      allowed: true,
      requiresPayment: false,
    };
  }

  // Requires payment
  return {
    allowed: false,
    requiresPayment: true,
    message: "You've used your free optimization! Purchase more to continue.",
  };
}

/**
 * Record an optimization use
 */
export function recordUsage(): void {
  if (typeof window === 'undefined') return;

  const usage = getUsageData();
  const now = new Date().toISOString();

  // If first use, mark free as used
  if (!usage.freeUsed) {
    usage.freeUsed = true;
    usage.freeUsedAt = now;
  } else if (usage.paidCredits > 0) {
    // Deduct from paid credits
    usage.paidCredits--;
  }

  usage.lastUsedAt = now;
  usage.totalUses++;

  try {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  } catch (error) {
    console.error('Failed to save usage data:', error);
  }
}

/**
 * Add paid credits (after successful payment)
 */
export function addCredits(count: number): void {
  if (typeof window === 'undefined') return;

  const usage = getUsageData();
  usage.paidCredits += count;

  try {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  } catch (error) {
    console.error('Failed to add credits:', error);
  }
}

/**
 * Reset usage data (for testing or user request)
 */
export function resetUsageData(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(USAGE_KEY);
    localStorage.removeItem(CREDITS_KEY);
  } catch (error) {
    console.error('Failed to reset usage data:', error);
  }
}

/**
 * Get remaining credits
 */
export function getRemainingCredits(): number {
  const usage = getUsageData();
  
  if (!usage.freeUsed) {
    return 1; // Free use available
  }
  
  return usage.paidCredits;
}











