/* eslint-disable no-undef */
import { useState } from 'react';
import { useUser } from '../../lib/context/user';

import './login.css';
import { toast } from 'react-toastify';
import { databases } from '../../lib/appwrite';
import { ID } from 'appwrite';
import uploadFile from '../../lib/upload';

export default function Login() {
	const { login, register } = useUser();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
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

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await login(email, password);
			e.target.reset();
		} catch (error) {
			console.log(error);
			toast.error('Login failed!');
		}
		setLoading(false);
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData(e.target);
			const { email, password, username } = Object.fromEntries(formData);
			// Validate email, password, and username
			if (!email || !password || !username) {
				throw new Error(
					'All fields (email, password, username) must be filled out.'
				);
			}
			// Upload the avatar file and get the URL
			const url = await uploadFile();
			// Check if the URL is valid
			if (!url) {
				throw new Error('Avatar upload failed, URL is null or undefined.');
			}
			// Register the user and get the new user data
			await register(email, password, username, url);

			e.target.reset();
			setAvatar({ file: null, url: '' });
			// Optionally, log in the user after registration
			// await login(email, password);
		} catch (error) {
			console.error(error);
			toast.error('Registration failed!');
		}
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

					<button disabled={loading}>{loading ? 'Loading' : 'Login'}</button>
				</form>
			</div>
			<div className='separator'></div>
			<div className='item'>
				<h2>Create an Account</h2>
				<form onSubmit={handleRegister}>
					<label htmlFor='uploader'>
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
					<input type='email' name='email' placeholder='Email' />
					<input type='password' name='password' placeholder='Password' />
					<button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
				</form>
			</div>
		</div>
	);
}
