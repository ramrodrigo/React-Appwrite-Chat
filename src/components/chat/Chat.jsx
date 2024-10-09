import './chat.css';

export default function Chat() {
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
			<div className='center'></div>
			<div className='bottom'></div>
		</div>
	);
}
