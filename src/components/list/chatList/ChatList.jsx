import { useState } from 'react';
import './chatList.css';

export default function ChatList() {
	const [addMode, setAddMode] = useState(false);
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
			<div className='item'>
				<img src='./avatar.png' alt='' />
				<div className='texts'>Jane Doe</div>
				<p>Hello!</p>
			</div>
			<div className='item'>
				<img src='./avatar.png' alt='' />
				<div className='texts'>Jane Doe</div>
				<p>Hello!</p>
			</div>
			<div className='item'>
				<img src='./avatar.png' alt='' />
				<div className='texts'>Jane Doe</div>
				<p>Hello!</p>
			</div>
		</div>
	);
}
