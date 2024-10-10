/* eslint-disable no-undef */
import { useState } from 'react';
import './login.css';
import { toast, Bounce } from 'react-toastify';

export default function Login() {
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
					<input type='text' placeholder='Email' name='email' />
					<input type='password' placeholder='Password' name='password' />
					{/* <button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button> */}
					<button>Sign In</button>
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
					<input type='text' placeholder='Email' name='email' />
					<input type='password' placeholder='Password' name='password' />
					<button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
				</form>
			</div>
		</div>
	);
}
