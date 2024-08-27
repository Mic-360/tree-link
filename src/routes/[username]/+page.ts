import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase.config';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {

  const collectionRef = collection(db, 'users');
  const que = query(collectionRef, where('username', '==', params.username), limit(1));

  const querySnapshot = await getDocs(que);
  const exists = querySnapshot.docs[0]?.exists();
  const data = querySnapshot.docs[0]?.data();

  if (!exists) {
    throw error(404, 'that user does not exist!');
  }

  if (!data.published && data.isPrivate) {
    throw error(403, `The profile of @${data.username} is not public!`);
  }

  return {
    username: data.username,
    photoURL: data.photoURL,
    displayName: data.displayName,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    links: data.links,
    bio: data.bio,
    location: data.location,
    isPrivate: data.isPrivate,
    published: data.published
  };
}) satisfies PageLoad;
