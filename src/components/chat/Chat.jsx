import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

export default function Chat() {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState('');
	const endRef = useRef();

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	const handleEmoji = (e) => {
		setText((prev) => prev + e.emoji);
		setOpen(false);
	};

	return (
		<div className='chat'>
			<div className='top'>
				<div className='user'>
					<img src='./avatar.png' alt='' />
					<div className='texts'></div>
					<span>Jane Doe</span>
					<p>Integer id augue vitae urna tristique tempus.</p>
				</div>
				<div className='icons'>
					<img src='./phone.png' alt='' />
					<img src='./video.png' alt='' />
					<img src='./info.png' alt='' />
				</div>
			</div>
			<div className='center'>
				<div className='message own'>
					<div className='texts'>
						<p>
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<span>1 min ago</span>
					</div>
				</div>
				<div className='message'>
					<img src='./avatar.png' alt='' />
					<div className='texts'>
						<img src='https://images.unsplash.com/photo-1713627242674-db55a2ba7cee?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
						<p>
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<span>1 min ago</span>
					</div>
				</div>
				<div className='message own'>
					<div className='texts'>
						<img
							src='https://images.unsplash.com/photo-1713260859076-c62da46dcf3b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							alt=''
						/>
						<p>
							Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<span>1 min ago</span>
					</div>
				</div>
				<div ref={endRef} />
			</div>
			<div className='bottom'>
				<div className='icons'>
					<img src='./img.png' alt='' />
					<img src='./camera.png' alt='' />
					<img src='./mic.png' alt='' />
				</div>
				<input
					type='text'
					placeholder='Type a message...'
					onChange={(e) => setText(e.target.value)}
					value={text}
				/>
				<div className='emoji'>
					<img
						src='./emoji.png'
						alt=''
						onClick={() => setOpen((prev) => !prev)}
					/>

					<div className='picker'>
						<EmojiPicker open={open} onEmojiClick={handleEmoji} />
					</div>
				</div>
				<button className='sendButton'>Send</button>
			</div>
		</div>
	);
}
