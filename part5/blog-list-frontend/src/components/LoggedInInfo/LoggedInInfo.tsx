import './LoggedInInfo.css'

import LoginService from '../../services/login';

import type { Dispatch, SetStateAction } from 'react'

interface LoggedInInfoProps {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function LoggedInInfo({setIsLoggedIn}: LoggedInInfoProps)
{
	return (
		<div className='header-user-info'>
			<p>
				Logged in as <em>{LoginService.getUserData()?.name}</em>
			</p>
			<button onClick={() => setIsLoggedIn(false)}>Logout</button>
		</div>
	);
}

export default LoggedInInfo;

