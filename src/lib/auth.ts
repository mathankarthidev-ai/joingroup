import { UserProfile, UserRole } from '@/lib/types';

const AUTH_STORAGE_KEY = 'grouphub_logged_user';
const AUTH_EVENT_NAME = 'grouphub_auth_change';

export function getStoredUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch (err) {
    console.error('Error parsing stored user:', err);
    return null;
  }
}

export function storeUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: user }));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Error saving user to storage:', err);
  }
}

export const setStoredUser = storeUser;

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: null }));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Error clearing user storage:', err);
  }
}

export function onAuthStateChange(callback: (user: UserProfile | null) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = (e: Event) => {
    const custom = e as CustomEvent<UserProfile | null>;
    if (custom.detail !== undefined) {
      callback(custom.detail);
    } else {
      callback(getStoredUser());
    }
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key === AUTH_STORAGE_KEY || !e.key) {
      callback(getStoredUser());
    }
  };

  window.addEventListener(AUTH_EVENT_NAME, handler);
  window.addEventListener('storage', storageHandler);

  return () => {
    window.removeEventListener(AUTH_EVENT_NAME, handler);
    window.removeEventListener('storage', storageHandler);
  };
}
