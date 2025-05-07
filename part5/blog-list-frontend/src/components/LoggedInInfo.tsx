import LoginService from '../services/login';

import type { Dispatch, SetStateAction } from 'react'

interface LoggedInInfoProps {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function LoggedInInfo({setIsLoggedIn}: LoggedInInfoProps)
{
	return (
		<>
			<p>Logged in as {LoginService.getUserData()?.name}</p>
			<button onClick={() => setIsLoggedIn(false)}>Logout</button>
		</>
	);
}

export default LoggedInInfo;

