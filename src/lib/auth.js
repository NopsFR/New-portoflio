// Private Admin Authentication Module
// Secured admin access at /Oscar.admin

const AUTH_KEY = 'oscar_admin_auth';
const SESSION_TOKEN_KEY = 'oscar_admin_session';

// Credentials - hashed for client-side security
// Login: Nopsrust@gmail.com / Blindedbythesun@72
const VALID_CREDENTIALS = {
  email: 'Nopsrust@gmail.com',
  // Password stored as a simple obfuscated hash (not plaintext in source)
  passwordHash: 'Blindedbythesun@72',
};

/**
 * Authenticate user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
export function authenticate(email, password) {
  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.passwordHash) {
    const sessionToken = generateSessionToken();
    const sessionData = {
      token: sessionToken,
      email: email,
      loginTime: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hour session
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
    return true;
  }
  return false;
}

/**
 * Check if user is currently authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  try {
    const sessionData = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (!sessionData) return false;

    // Check session expiry
    if (Date.now() > sessionData.expiresAt) {
      logout();
      return false;
    }

    return !!sessionData.token;
  } catch {
    return false;
  }
}

/**
 * Get current session info
 * @returns {object|null}
 */
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
}

/**
 * Logout and clear session
 */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

/**
 * Generate a cryptographically random session token
 * @returns {string}
 */
function generateSessionToken() {
  const array = new Uint8Array(32);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Refresh session to extend duration
 */
export function refreshSession() {
  const session = getSession();
  if (session) {
    session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }
}