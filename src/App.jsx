import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { UserProvider } from './lib/context/user';
import { useUser } from './lib/context/user';

const App = () => {
	return (
		<UserProvider>
			<div className='container'>
				<AppContent />
			</div>
		</UserProvider>
	);
};

const AppContent = () => {
	const user = useUser();
	console.log(user);
	return (
		<>
			{user.current !== null && user.current !== undefined ? (
				<>
					<List />
					<Chat />
					<Detail />
				</>
			) : (
				<Login />
			)}
			<Notification />
		</>
	);
};

export default App;
