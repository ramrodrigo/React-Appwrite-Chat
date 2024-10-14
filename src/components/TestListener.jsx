import { useEffect, useState } from 'react';
import { client } from '../lib/appwrite';
import localForage from 'localforage';

// Listen to changes in user database
export default function TestListener() {
	const [data, setData] = useState(null);
	const db = import.meta.env.VITE_DB_ID;
	const collection = import.meta.env.VITE_USERSCOLLECTION_ID;

	// Save data to local storage
	useEffect(() => {
		const saveDataToLocalStorage = async () => {
			if (data !== null) {
				await localForage.setItem('data', data);
			}
		};

		saveDataToLocalStorage();

		const fetchDataFromLocalStorage = async () => {
			const storedData = await localForage.getItem('data');
			// You can handle the fetched data here if needed
		};

		fetchDataFromLocalStorage();
	}, [data]);

	// Update data state when user logs in
	useEffect(() => {
		const unsubscribe = client.subscribe(
			`databases.${db}.collections.${collection}.documents`,
			(response) => {
				const event = response.events[0];
				if (event) {
					setData(event);
				}
			}
		);

		// Cleanup: Unsubscribe when the component unmounts
		return () => {
			unsubscribe();
		};
	}, [collection, db]);

	return null;
}
