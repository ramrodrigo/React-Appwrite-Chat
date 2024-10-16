import './addUser.css';
import { databases } from '../../../../lib/appwrite';
import { Query } from 'appwrite';
import { useState } from 'react';

export default function AddUser() {
	const [user, setUser] = useState(null);
	console.log('🚀 ~ AddUser ~ user:', user);

	const handleSearch = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const username = formData.get('username');

		//todo: query for user with username
		const db = import.meta.env.VITE_DB_ID;
		const collection = import.meta.env.VITE_USERSCOLLECTION_ID;

		const user = await databases.listDocuments(db, collection, [
			Query.equal('username', [username]),
		]);
		setUser(user.documents[0]);
	};

	return (
		<div className='addUser'>
			<form onSubmit={handleSearch}>
				<input type='text' placeholder='Username' name='username' />
				<button>Search</button>
			</form>
			{user && (
				<div className='user'>
					<div className='detail'>
						<img src={user?.avatar || './avatar.png'} />
						<span>{user?.username}</span>
					</div>
					<button>Add User</button>
				</div>
			)}
		</div>
	);
}
