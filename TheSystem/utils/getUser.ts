import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export function getCurrentUser(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}
