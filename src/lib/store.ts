import { derived, writable, type Readable } from 'svelte/store';
import { auth, db } from './firebase.config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    // const user = result.user;
  } catch (error) {
    console.error(error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const userStore = () => {
  let unsubscribe: () => void;
  if (!auth || !globalThis.window) {
    console.error('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe
    };
  }
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });
    return () => unsubscribe();
  });

  return {
    subscribe
  };
};

export const user = userStore();

export const docStore = <T>(path: string, initialState: T) => {
  let unsubscribe: () => void;
  const docRef = doc(db, path);
  const { subscribe, set } = writable<T | null>(initialState, (set) => {
    unsubscribe = onSnapshot(docRef, (snap) => {
      set((snap.data() as T) ?? initialState);
    });
    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id
  };
};

export type UserData = {
  username: string;
  photoURL: string | null;
  displayName: string | null;
  createdAt: Date;
  updatedAt: Date;
  links: Link[];
  bio: string;
  location: string;
  isPrivate: boolean;
  published: boolean;
};

type Link = {
  title: string;
  url: string;
  icon: string;
};


export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore(`users/${$user.uid}`, null).subscribe(set);
  } else {
    set(null);
  }
});
