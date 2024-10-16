import capFirstLetter from '../../../lib/capFirstLetter';
import { useUserStore } from '../../../lib/userStore';
import './userInfo.css';
export default function UserInfo() {
	const { currentUser } = useUserStore();

	return (
		<div className='userInfo'>
			<div className='user'>
				<img src={currentUser?.avatar || './avatar.png'} alt='' />
				<h2>{capFirstLetter(currentUser?.username)}</h2>
			</div>
			<div className='icons'>
				<img src='./more.png' alt='' />
				<img src='./video.png' alt='' />
				<img src='./edit.png' alt='' />
			</div>
		</div>
	);
}
