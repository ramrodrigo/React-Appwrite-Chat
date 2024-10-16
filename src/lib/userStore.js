import { create } from 'zustand';
import { account } from './appwrite';
import { databases } from './appwrite';
import { Query } from 'appwrite';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
	persist(
		(set) => ({
			currentUser: null,
			isLoading: true,
			chats: null,

			fetchUserInfo: async (uid) => {
				// console.log('🚀 ~ fetchUserInfo: ~ uid:', uid);
				if (!uid) return set({ currentUser: null, isLoading: false });

				try {
					const db = import.meta.env.VITE_DB_ID;
					const collection = import.meta.env.VITE_USERSCOLLECTION_ID;

					const res = await databases.listDocuments(db, collection, [
						Query.equal('id', [uid]),
					]);
					const userExists = res.documents.length > 0;
					localStorage.setItem('isUserLogged', userExists);
					set({
						currentUser: userExists ? res.documents[0] : null,
						isLoading: false,
					});
				} catch (error) {
					console.error('Error fetching user info:', error);
					return set({ currentUser: null, isLoading: false });
				}
			},

			setChats: (chats) => set({ chats }),
		}),
		{
			name: 'user-store', // name of the store
			getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
		}
	)
);

/*

import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      chats: null,
      setChats: (chats) => set({ chats }),
    }),
    {
      name: 'user-store', // name of the store
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
*/
