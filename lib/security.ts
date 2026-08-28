// In-memory rate limiter for login attempts
interface AttemptRecord {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds?: number } {
  const key = identifier.toLowerCase().trim();
  const record = loginAttempts.get(key);
  const now = Date.now();

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Check if locked
  if (record.lockedUntil && record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // If lockout expired, reset
  if (record.lockedUntil && record.lockedUntil <= now) {
    loginAttempts.delete(key);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  return { allowed: record.count < MAX_ATTEMPTS, remainingAttempts: remaining };
}

export function recordFailedAttempt(identifier: string): { locked: boolean; retryAfterSeconds?: number; remainingAttempts: number } {
  const key = identifier.toLowerCase().trim();
  const record = loginAttempts.get(key) || { count: 0, lastAttempt: Date.now() };
  const now = Date.now();

  record.count += 1;
  record.lastAttempt = now;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    loginAttempts.set(key, record);
    return { locked: true, retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000), remainingAttempts: 0 };
  }

  loginAttempts.set(key, record);
  return { locked: false, remainingAttempts: MAX_ATTEMPTS - record.count };
}

export function resetAttempts(identifier: string): void {
  const key = identifier.toLowerCase().trim();
  loginAttempts.delete(key);
}

export function validatePasswordStrength(password: string): { isValid: boolean; message?: string; score: number } {
  if (!password || password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long.', score: 1 };
  }

  let score = 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score < 2) {
    return { isValid: false, message: 'Password must include a mix of letters and numbers/symbols.', score };
  }

  return { isValid: true, score };
}
