import { useState } from 'react'
import InputField from '../InputField/InputField';
import UsersService from '../../services/users'

import type { FormEventHandler } from 'react'
import type { NotifyFunction } from '../BloglistApp/BloglistApp'
import type { StandardError } from '../../services/axios'

interface CreateUserFormProps {
	notifyFn: NotifyFunction;
}


function CreateUserForm({notifyFn}: CreateUserFormProps)
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

			notifyFn(
				'status', 
				'User Successfully Created', 
				`User "${newUser.username}" was successfully created`
			);
		}
		catch (err) {
			setNameInput('');
			setUsernameInput('');
			setPasswordInput('');

			const e = err as StandardError;
			notifyFn(
				'alert', 
				`User "${newUser.username}" Was Unable to be Created: ${e.name}`, 
				`${e.message}. Perhaps the supplied username is too short`
			);
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
			<button type='submit' className='submit-button'>Create</button>
		</form>
	)
}

export default CreateUserForm;

