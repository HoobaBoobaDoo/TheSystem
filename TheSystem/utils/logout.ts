import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

export async function logoutUser() {
  await signOut(auth);
}
