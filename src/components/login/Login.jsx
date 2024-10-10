/* eslint-disable no-undef */
import { useState } from 'react';
import { useUser } from '../../lib/context/user';
import './login.css';
import { toast, Bounce } from 'react-toastify';

export default function Login() {
	const user = useUser();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailReg, setEmailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');
	const [avatar, setAvatar] = useState({
		file: null,
		url: '',
	});

	const [loading, setLoading] = useState(false);

	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleLogin = (e) => {
		e.preventDefault();
		toast.success('🦄 Wow so easy!', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
			transition: Bounce,
		});
	};

	return (
		<div className='login'>
			<div className='item'>
				<h2>Welcome back,</h2>
				<form onSubmit={handleLogin}>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>

					<div>
						<button
							className='button'
							type='button'
							onClick={() => user.login(email, password)}
							disabled={loading}
						>
							{loading ? 'Loading' : 'Login'}
						</button>
					</div>
				</form>
			</div>
			<div className='separator'></div>
			<div className='item'>
				<h2>Create an Account</h2>
				<form>
					<label htmlFor='file'>
						<img src={avatar.url || './avatar.png'} alt='' />
						Upload an image
					</label>
					<input
						type='file'
						id='file'
						style={{ display: 'none' }}
						onChange={handleAvatar}
					/>
					<input type='text' placeholder='Username' name='username' />
					<input
						type='email'
						placeholder='Email'
						value={emailReg}
						onChange={(event) => {
							setEmailReg(event.target.value);
						}}
					/>
					<input
						type='password'
						placeholder='Password'
						value={passwordReg}
						onChange={(event) => {
							setPasswordReg(event.target.value);
						}}
					/>

					<button
						className='button'
						type='button'
						onClick={() => user.register(emailReg, passwordReg)}
						disabled={loading}
					>
						{loading ? 'Loading' : 'Register'}
					</button>
				</form>
			</div>
		</div>
	);
}
