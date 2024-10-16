/* eslint-disable react-refresh/only-export-components */
import { ID } from 'appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { account, databases } from '../appwrite';
import { toast } from 'react-toastify';

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider(props) {
	const [user, setUser] = useState(null);

	const db = import.meta.env.VITE_DB_ID;
	const collection = import.meta.env.VITE_USERSCOLLECTION_ID;

	async function login(email, password) {
		const loggedIn = await account.createEmailPasswordSession(email, password);
		setUser(loggedIn);
		if (loggedIn) {
			localStorage.setItem('isUserLogged', true);
		}
		toast.success('You are logged in!');
		window.location.replace('/');

		// you can use different redirect method for your application
	}

	async function logout() {
		localStorage.setItem('isUserLogged', false);
		await account.deleteSession('current');
		setUser(null);
		toast.success('Logged out!');
		window.location.replace('/');
	}

	async function register(email, password, username, url) {
		//register new user
		const newUser = await account.create(ID.unique(), email, password);
		//create new user document
		const response = await databases.createDocument(
			db,
			collection,
			ID.unique(),
			{
				username,
				avatar: url,
				email,
				password,
				id: newUser.$id,
			}
		);

		toast.success('New account created.');
		//login user
		await login(email, password);
	}

	async function init() {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn);
		} catch (err) {
			setUser(null);
		}
	}

	useEffect(() => {
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserContext.Provider
			value={{
				current: user,
				setUser,
				login,
				logout,
				register,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
}
