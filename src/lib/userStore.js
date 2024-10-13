import { create } from 'zustand';
import { account } from './appwrite';
import { databases } from './appwrite';
import { Query } from 'appwrite';

export const useUserStore = create((set) => ({
	currentUser: null,
	// isLoading: true,
	isLoading: false,

	fetchUserInfo: async (uid) => {
		// console.log('🚀 ~ fetchUserInfo: ~ uid:', uid);
		const db = import.meta.env.VITE_DB_ID;
		const collection = import.meta.env.VITE_USERSCOLLECTION_ID;

		if (!uid) return set({ currentUser: null, isLoading: false });
		try {
			set({ isLoading: true });
			const res = await databases.listDocuments(db, collection, [
				Query.equal('id', [uid]),
			]);
			if (res.documents.length !== 0) {
				localStorage.setItem('isUserLogged', true);
				set({ currentUser: res.documents[0], isLoading: false });
			} else {
				set({ currentUser: null, isLoading: false });
			}
		} catch (error) {
			console.log(error);
			return set({ currentUser: null, isLoading: false });
		}
	},
}));

/*
import { Client, Databases, Query } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('<PROJECT_ID>');

const databases = new Databases(client);

databases.listDocuments(
    '<DATABASE_ID>',
    '[COLLECTION_ID]',
    [
        Query.equal('title', ['Avatar', 'Lord of the Rings']),
        Query.greaterThan('year', 1999)
    ]
);

*/
