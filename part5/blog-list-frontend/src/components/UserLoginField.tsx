import { useRef } from 'react'
import LoginService from '../services/login'
import Toggleable from './Toggleable'
import TextField from './utility/TextField'
import Form from './utility/Form'

import type { FormEventHandler, MouseEventHandler } from 'react'
import type { ToggleableRefHandle } from './Toggleable'
import type { TextFieldRefHandle } from './utility/TextField'

const UserLoginField = () => {
	const toggleRef = useRef<ToggleableRefHandle>(null);
	const usernameFieldRef = useRef<TextFieldRefHandle>('');
	const passwordFieldRef = useRef<TextFieldRefHandle>('');

	const handleLogin:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const loginDetails = {
			username: usernameFieldRef.current,
			password: passwordFieldRef.current
		};

		try {
			await LoginService.login(loginDetails);
			toggleRef.current?.toggleState();
		}
		catch {
			console.log('ERORR HANDLING IN LIOGN FIELD');
		}
	};

	const handleLogout:MouseEventHandler<HTMLButtonElement> = () => {
		LoginService.logout();
		toggleRef.current?.toggleState();
	};

	const loggedInInfo = () => {
		return (
			<>
				<p>Logged in as {LoginService.getUsername()}</p>
				<button onClick={handleLogout}>Logout</button>
			</>
		);
	};

	const loginForm = () => {
		return (
			<>
				<h1>Login</h1>
				<Form onSubmit={handleLogin}>
					<TextField fieldId='username-field' ref={usernameFieldRef}>
						Username: 
					</TextField>

					<br/>

					<TextField fieldId='password-field' inputType='password' ref={passwordFieldRef}>
						Password: 
					</TextField>

					<br/>

					<button type='submit'>Login</button>
				</Form>
			</>
		);
	};

	return (
		<Toggleable 
			defaultOn={true}
			ref={toggleRef}
			whenOff={loggedInInfo}
		>
			{loginForm}
		</Toggleable>
	);
};

export default UserLoginField;

