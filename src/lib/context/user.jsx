/* eslint-disable react-refresh/only-export-components */
import { ID } from 'appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { account, databases } from '../appwrite';
import { toast } from 'react-toastify';
import { useUserStore } from '../userStore';

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider(props) {
	const [user, setUser] = useState(null);

	async function login(email, password) {
		const loggedIn = await account.createEmailPasswordSession(email, password);
		// setUser(loggedIn);

		// window.location.replace('/');

		// you can use different redirect method for your application
	}

	async function currentUser() {
		const result = await account.get();
		return result;
	}

	async function logout() {
		await account.deleteSession('current');
		setUser(null);
		localStorage.setItem('isUserLogged', false);
		window.location.replace('/');
		console.log('logging out!!!!!!!');
		toast.success('Logged out!');
	}

	async function register(email, password) {
		const newUser = await account.create(ID.unique(), email, password);
		if (newUser) {
			toast.success('New account created.');
		}
		return newUser;
		// console.log('🚀 ~ register ~ response:', response.$id);
	}

	async function init() {
		try {
			const loggedIn = await account.get();
			if (!loggedIn) return;
			setUser(loggedIn);
		} catch (err) {
			setUser(null);
		}
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<UserContext.Provider
			value={{ current: user, setUser, login, logout, register, currentUser }}
		>
			{props.children}
		</UserContext.Provider>
	);
}
