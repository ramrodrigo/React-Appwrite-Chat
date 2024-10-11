/* eslint-disable no-undef */
import { useState } from 'react';
import { useUser } from '../../lib/context/user';
import './login.css';
import { toast, Bounce } from 'react-toastify';
import { databases } from '../../lib/appwrite';
import { ID } from 'appwrite';

export default function Login() {
	const { user, login, register } = useUser();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailReg, setEmailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');
	const [avatar, setAvatar] = useState({
		file: null,
		url: '',
	});
	const db = import.meta.env.VITE_DB_ID;
	const collection = import.meta.env.VITE_COLLECTION_ID;
	const [loading, setLoading] = useState(false);

	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		await login(email, password);
		setLoading(false);
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { email, password, username } = Object.fromEntries(formData);
		const newUser = await register(email, password);
		//add user to collection
		const promise = databases.createDocument(db, collection, ID.unique(), {
			username: username,
			email: email,
			password: password,
			id: newUser.$id,
		});
		promise.then(
			function (response) {
				console.log(response);
			},
			function (error) {
				console.log(error);
			}
		);
		// login(email, password);
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
						<button disabled={loading}>{loading ? 'Loading' : 'Login'}</button>
					</div>
				</form>
			</div>
			<div className='separator'></div>
			<div className='item'>
				<h2>Create an Account</h2>
				<form onSubmit={handleRegister}>
					<label htmlFor='file'>
						<img src={avatar.url || './avatar.png'} alt='' />
						Upload an image
					</label>
					<input
						type='file'
						id='uploader'
						style={{ display: 'none' }}
						onChange={handleAvatar}
					/>
					<input type='text' placeholder='Username' name='username' />
					<input
						type='email'
						name='email'
						placeholder='Email'
						value={emailReg}
						onChange={(event) => {
							setEmailReg(event.target.value);
						}}
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						value={passwordReg}
						onChange={(event) => {
							setPasswordReg(event.target.value);
						}}
					/>
					<button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
				</form>
			</div>
		</div>
	);
}
