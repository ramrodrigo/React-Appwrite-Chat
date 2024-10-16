import { useEffect, useState } from 'react';
import './chatList.css';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { client, databases } from '../../../lib/appwrite';
import { Query } from 'appwrite';

export default function ChatList() {
	const [addMode, setAddMode] = useState(false);
	const [chatId, setChatId] = useState(null);
	const { chats, setChats } = useUserStore(); // Get the chats state and setter from Zustand

	console.log('🚀 ~ ChatList ~ chats:', chats);

	const db = import.meta.env.VITE_DB_ID;
	const collection = import.meta.env.VITE_CHATSCOLLECTION_ID;

	useEffect(() => {
		const fetchChats = async () => {
			if (!chatId) return;
			const res = await databases.listDocuments(db, collection, [
				Query.equal('$id', chatId),
			]);
			// Set the chats state in Zustand
			setChats(res.documents[0]?.chats);
		};

		fetchChats();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatId]);

	useEffect(() => {
		const unsubscribe = client.subscribe(
			`databases.${db}.collections.${collection}.documents`,
			(response) => {
				const id = response.payload.$id;
				setChatId(id);
			}
		);
		// Cleanup: Unsubscribe when the component unmounts
		return () => {
			unsubscribe();
		};
	}, [collection, db]);

	return (
		<div className='chatList'>
			<div className='search'>
				<div className='searchBar'>
					<img src='./search.png' alt='' />
					<input type='text' placeholder='Search' />
				</div>
				<img
					className='add'
					src={addMode ? './minus.png' : './plus.png'}
					alt=''
					onClick={() => setAddMode((prev) => !prev)}
				/>
			</div>

			{chats.map((chat) => (
				<div className='item' key={chat + Math.random()}>
					<img src='./avatar.png' alt='' />
					<div className='texts'>
						<span>Jane Doe</span>
						<p>{chat}</p>
					</div>
				</div>
			))}
			{addMode && <AddUser />}
		</div>
	);
}
