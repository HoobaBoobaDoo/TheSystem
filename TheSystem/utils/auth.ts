import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

/**
 * Registreert een nieuwe gebruiker.
 */
export async function registerUser(user: User): Promise<string | null> {
  try {
    const usersRaw = await AsyncStorage.getItem('users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    const exists = users.some(
      (u) => u.username === user.username || u.email === user.email
    );

    if (exists) return 'Username or email already exists';

    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));

    return null;
  } catch (error) {
    console.error('Error registering user:', error);
    return 'An unexpected error occurred';
  }
}

/**
 * Logt een gebruiker in.
 */
export async function loginUser(username: string, password: string): Promise<string | null> {
  try {
    const usersRaw = await AsyncStorage.getItem('users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return 'Invalid username or password';

    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return 'An unexpected error occurred';
  }
}

/**
 * Logt de huidige gebruiker uit.
 */
export async function logoutUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

/**
 * Haalt de huidige gebruiker op.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const userRaw = await AsyncStorage.getItem('currentUser');
    return userRaw ? JSON.parse(userRaw) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
