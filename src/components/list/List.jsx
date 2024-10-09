import ChatList from './chatList/ChatList';
import './list.css';
import UserInfo from './UserInfo/UserInfo';

export default function List() {
	return (
		<div className='list'>
			<UserInfo />
			<ChatList />
		</div>
	);
}
