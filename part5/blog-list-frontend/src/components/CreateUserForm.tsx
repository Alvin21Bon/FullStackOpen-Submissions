import { useState } from 'react'
import InputField from './InputField';
import UsersService from '../services/users'

import type { FormEventHandler } from 'react'

function CreateUserForm()
{
	const [nameInput, setNameInput] = useState('');
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const handleCreate:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const newUser = {
			name: nameInput,
			username: usernameInput,
			password: passwordInput
		};

		try {
			await UsersService.create(newUser);
			setNameInput('');
			setUsernameInput('');
			setPasswordInput('');
		}
		catch (err) {
			console.log('ERROR NOTICE IN CREATE USER FORM', err);
		}
	}

	return (
		<form onSubmit={handleCreate}>
			<h1>Create a User</h1>
			<InputField
				label='Name: '
				id='create-user-form-name-field'
				value={nameInput}
				onChange={(event) => setNameInput(event.target.value)}
			/>
			<InputField
				label='Username: '
				id='create-user-form-username-field'
				value={usernameInput}
				onChange={(event) => setUsernameInput(event.target.value)}
			/>
			<InputField
				label='Password: '
				id='create-user-form-password-field'
				type='password'
				value={passwordInput}
				onChange={(event) => setPasswordInput(event.target.value)}
			/>
			<button type='submit'>Create</button>
		</form>
	)
}

export default CreateUserForm;

