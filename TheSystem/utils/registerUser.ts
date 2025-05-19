import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { User } from './types'; // Adjust this path if needed

export async function registerUser(user: User): Promise<string | null> {
  try {
    console.log('👤 Attempting Firebase Auth registration...');
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    console.log('✅ Firebase Auth account created:', userCredential.user.uid);

    await updateProfile(userCredential.user, { displayName: user.username });
    console.log('📝 Updated user profile with displayName:', user.username);

    const { password, ...userData } = user;

    console.log('📦 Writing user data to Firestore...');
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      ...userData,
      uid: userCredential.user.uid,
    });

    console.log('✅ Firestore user document written successfully.');
    return null;
  } catch (err: any) {
    console.error('❌ Registration error:', err);
    return err.message || 'Registration failed';
  }
}
