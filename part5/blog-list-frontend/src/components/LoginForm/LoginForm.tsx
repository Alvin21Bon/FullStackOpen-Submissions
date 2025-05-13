import { useState } from 'react'
import InputField from '../InputField/InputField';
import LoginService from '../../services/login'

import type { FormEventHandler, Dispatch, SetStateAction } from 'react'
import type { NotifyFunction } from '../BloglistApp/BloglistApp'
import type { StandardError } from '../../services/axios';

interface LoginFormProps {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	notifyFn: NotifyFunction;
}

function LoginForm({setIsLoggedIn, notifyFn}: LoginFormProps)
{
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const handleLogin:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const credentials = {
			username: usernameInput,
			password: passwordInput
		};

		try {
			await LoginService.login(credentials);
			setUsernameInput('');
			setPasswordInput('');
			setIsLoggedIn(true);
		}
		catch (err) {
			setUsernameInput('');
			setPasswordInput('');

			const e = err as StandardError;
			notifyFn(
				'alert', 
				`Login Failed: ${e.name}`, 
				e.message
			);
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<h1>Login</h1>
			<InputField
				label='Username: '
				id='login-form-username-field'
				value={usernameInput}
				onChange={(event) => setUsernameInput(event.target.value)}
			/>
			<InputField
				label="Password: "
				id='login-form-password-field'
				type='password'
				value={passwordInput}
				onChange={(event) => setPasswordInput(event.target.value)}
			/>
			<button type='submit' className='submit-button'>Login</button>
		</form>
	);
}

export default LoginForm;

