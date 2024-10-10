import { useState } from 'react';
import './login.css';

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
	return (
		<div className='login'>
			<div className='item'>
				<h2>Welcome back,</h2>
				<form>
					<input type='text' placeholder='Email' name='email' />
					<input type='password' placeholder='Password' name='password' />
					<button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
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
