import './Header.css'

import LoginForm from '../LoginForm/LoginForm'
import CreateUserForm from '../CreateUserForm/CreateUserForm'
import LoggedInInfo from '../LoggedInInfo/LoggedInInfo'

import type { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
	isLoggedIn: boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Header({isLoggedIn, setIsLoggedIn}: HeaderProps)
{
	return (
		<>
			{isLoggedIn ? (
				<LoggedInInfo setIsLoggedIn={setIsLoggedIn} />
			) : (
				<section className='header-forms'>
					<article>
						<LoginForm setIsLoggedIn={setIsLoggedIn} />
					</article>
					<article>
						<CreateUserForm />
					</article>
				</section>
			)}
		</>
	);
}

export default Header;

