/* eslint-disable react-refresh/only-export-components */
import { ID } from 'appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { account, databases } from '../appwrite';

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider(props) {
	const [user, setUser] = useState(null);
	// console.log('🚀 ~ UserProvider ~ user:', user);

	async function login(email, password) {
		const loggedIn = await account.createEmailPasswordSession(email, password);
		setUser(loggedIn);
		// you can use different redirect method for your application
	}

	async function logout() {
		await account.deleteSession('current');
		setUser(null);
		console.log('logging out!!!!!!!');
	}

	async function register(email, password) {
		const newUser = await account.create(ID.unique(), email, password);
		return newUser;
		// console.log('🚀 ~ register ~ response:', response.$id);
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
	}, []);

	return (
		<UserContext.Provider value={{ current: user, login, logout, register }}>
			{props.children}
		</UserContext.Provider>
	);
}
