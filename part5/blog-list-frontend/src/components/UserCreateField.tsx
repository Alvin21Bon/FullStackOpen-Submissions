import { useRef } from 'react'
import ToggleableForm from './ToggleableForm'
import Form from './utility/Form'
import TextField from './utility/TextField'
import UsersService from '../services/users'

import type { ToggleableFormRefHandle } from './ToggleableForm'
import type { FormEventHandler } from 'react'
import type { TextFieldRefHandle } from './utility/TextField'

const UserCreateField = () => {
	const toggleableFormRef = useRef<ToggleableFormRefHandle>(null);
	const usernameFieldRef = useRef<TextFieldRefHandle>('');
	const passwordFieldRef = useRef<TextFieldRefHandle>('');
	const nameFieldRef = useRef<TextFieldRefHandle>('');

	const handleCreate:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const userDetails = {
			username: usernameFieldRef.current,
			password: passwordFieldRef.current,
			name: nameFieldRef.current
		};

		try {
			await UsersService.create(userDetails);
			toggleableFormRef.current?.toggleState();
		}
		catch {
			console.log('ERRORS HERE IN USER CREATE FIELD');
		}
	};

	const createUserForm = () => {
		return (
			<>
				<h1>Create a User</h1>
				<Form onSubmit={handleCreate}>
					<TextField fieldId='username-field' ref={usernameFieldRef}>
						Username: 
					</TextField>

					<br/>

					<TextField fieldId='name-field' ref={nameFieldRef}>
						Name: 
					</TextField>

					<br/>

					<TextField fieldId='name-field' inputType='password' ref={passwordFieldRef}>
						Password: 
					</TextField>

					<br/>

					<button type='submit'>Create</button>
					<button onClick={() => toggleableFormRef.current?.toggleState()}>Cancel</button>
				</Form>
			</>
		);
	};

	return (
		<ToggleableForm buttonLabel='Create New User' ref={toggleableFormRef}>
			{createUserForm}
		</ToggleableForm>
	);
}

export default UserCreateField;

