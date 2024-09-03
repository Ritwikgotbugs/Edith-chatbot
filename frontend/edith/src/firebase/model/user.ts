import { db } from '../client';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { User } from '../type';

const userCollection = collection(db, 'users');

export const createUser = async (user: User) => {
  try {
    await addDoc(userCollection, user);
  } catch (error) {
    console.error("Error creating user: ", error);
  }
};

export const getUserByEmail = async (email: string) => {
  const q = query(userCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let userData: User | null = null;
  querySnapshot.forEach((doc) => {
    userData = doc.data() as User;
  });
  return userData;
};
export type { User };

