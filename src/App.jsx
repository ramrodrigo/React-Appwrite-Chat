import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import List from './components/list/List';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { UserProvider } from './lib/context/user';

const App = () => {
	const isLoginPage = window.location.pathname === '/login';
	// const user = true;
	return (
		<div className='container'>
			<UserProvider>
				{isLoginPage ? (
					<Login />
				) : (
					<>
						<List />
						<Chat />
						<Detail />
					</>
				)}
				<Notification />
			</UserProvider>
		</div>
	);
};

export default App;
