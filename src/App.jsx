/* eslint-disable react-hooks/exhaustive-deps */
import { UserProvider } from './lib/context/user';
import './index.css';
import Notification from './components/notification/Notification';
import { useEffect } from 'react';
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useUser } from './lib/context/user';
import { useUserStore } from './lib/userStore';

const App = () => {
	const isUserLogged = localStorage.getItem('isUserLogged') === 'true';

	const user = useUser();
	const uid = user?.current?.$id;
	// console.log('🚀 ~ App ~ uid:', uid);

	const { currentUser, isLoading, fetchUserInfo } = useUserStore();
	// console.log('🚀 ~ App ~ currentUser:', currentUser);

	useEffect(() => {
		// console.log('called useEffect');
		const fetchUser = async () => {
			if (uid !== null || uid !== undefined) {
				await fetchUserInfo(uid);
			}
		};
		fetchUser();
	}, [uid]);

	if (!uid && isUserLogged) {
		return (
			<div className='loading'>
				<span>Loading...</span>
			</div>
		);
	}
	return (
		<BrowserRouter>
			<div className='container'>
				<Routes>
					<Route
						path='/'
						element={
							currentUser || isUserLogged ? (
								<>
									<List />
									<Chat />
									<Detail />
								</>
							) : (
								<Login />
							)
						}
					/>
				</Routes>
				<Notification />
			</div>
		</BrowserRouter>
	);
};

export default App;
