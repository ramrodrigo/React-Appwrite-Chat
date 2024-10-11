import AppContent from './components/appContent/AppContent';
import { UserProvider } from './lib/context/user';

const App = () => {
	return (
		<UserProvider>
			<AppContent />
		</UserProvider>
	);
};

export default App;
