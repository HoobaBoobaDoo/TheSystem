import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { User } from '../utils/types';

export async function loginUser(email: string, password: string): Promise<string | null> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

    if (!userDoc.exists()) {
      return 'User profile not found in database.';
    }

    return null;
  } catch (err: any) {
    return err.message || 'Login failed';
  }
}
