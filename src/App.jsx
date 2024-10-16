/* eslint-disable react-hooks/exhaustive-deps */
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
	const { currentUser, isLoading, fetchUserInfo } = useUserStore();
	// console.log('🚀 ~ App ~ currentUser:', currentUser);

	const isUserLogged = localStorage.getItem('isUserLogged') === 'true';
	// console.log('🚀 ~ App ~ isUserLogged:', isUserLogged);

	const user = useUser();
	const uid = user?.current?.$id;
	// console.log('🚀 ~ App ~ uid:', uid);

	useEffect(() => {
		// console.log('called useEffect');
		const fetchUser = async () => {
			if (uid !== null || uid !== undefined) {
				await fetchUserInfo(uid);
			}
		};
		fetchUser();
	}, [uid]);

	// if (isLoading) {
	// 	return (
	// 		<div className='loading'>
	// 			<span>Loading...</span>
	// 		</div>
	// 	);
	// }
	return (
		<BrowserRouter>
			<div className='container'>
				<Routes>
					<Route
						path='/'
						element={
							isLoading ? (
								<div className='loading'>
									<span>Loading...</span>
								</div>
							) : currentUser ? (
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
