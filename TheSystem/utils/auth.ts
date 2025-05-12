import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  username: string;
  fullName: string;
  profilePicture?: string;
  email: string;
  password: string;
  rank: string;
  class: string;
  tags: string[];
  todos: string[];
};

export async function registerUser(user: User): Promise<string | null> {
  const usersRaw = await AsyncStorage.getItem('users');
  const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

  const exists = users.find(
    (u) => u.username === user.username || u.email === user.email
  );

  if (exists) return 'Username or email already exists';

  users.push(user);
  await AsyncStorage.setItem('users', JSON.stringify(users));
  await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  return null;
}

export async function loginUser(username: string, password: string): Promise<string | null> {
  const usersRaw = await AsyncStorage.getItem('users');
  const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return 'Invalid username or password';

  await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  return null;
}

export async function logoutUser() {
  await AsyncStorage.removeItem('currentUser');
}

export async function getCurrentUser(): Promise<User | null> {
  const userRaw = await AsyncStorage.getItem('currentUser');
  return userRaw ? JSON.parse(userRaw) : null;
}
