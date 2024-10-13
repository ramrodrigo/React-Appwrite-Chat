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
		setUser(loggedIn);
		localStorage.setItem('isUserLogged', true);
		toast.success('You are logged in!');
		window.location.replace('/');

		// you can use different redirect method for your application
	}

	async function currentUser() {
		const result = await account.get();
		return result;
	}

	async function logout() {
		localStorage.setItem('isUserLogged', false);
		await account.deleteSession('current');
		setUser(null);
		toast.success('Logged out!');
		window.location.replace('/');
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
			if (!user) {
				setUser(loggedIn);
			}
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
