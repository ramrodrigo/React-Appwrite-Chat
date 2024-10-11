import { useEffect, useState } from 'react';
import Chat from '../../components/chat/Chat';
import Detail from '../../components/detail/Detail';
import List from '../../components/list/List';
import Login from '../../components/login/Login';
import Notification from '../../components/notification/Notification';
import { useUser } from '../../lib/context/user';

const AppContent = () => {
	const user = useUser();
	// console.log('🚀 ~ AppContent ~ user:', user);
	const [authChecked, setAuthChecked] = useState(true);

	useEffect(() => {
		if (user.current !== null) {
			// Once user is fetched, set authChecked to true
			setAuthChecked(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, user.current]);

	// Show a loading phase until the authentication is checked
	if (!authChecked) {
		return <div>Loading...</div>; // Or any spinner/placeholder you prefer
	}

	return (
		<div className='container'>
			{!user.current && <Login />}
			{user.current && (
				<>
					<List />
					<Chat />
					<Detail />
				</>
			)}
			<Notification />
		</div>
	);
};

export default AppContent;
