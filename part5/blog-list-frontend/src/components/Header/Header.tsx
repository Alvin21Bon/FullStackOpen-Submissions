import './Header.css'

import LoginForm from '../LoginForm/LoginForm'
import CreateUserForm from '../CreateUserForm/CreateUserForm'
import LoggedInInfo from '../LoggedInInfo/LoggedInInfo'

import type { Dispatch, SetStateAction } from 'react'
import type { NotifyFunction } from '../BloglistApp/BloglistApp'

interface HeaderProps {
	isLoggedIn: boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	notifyFn: NotifyFunction;
}

function Header({isLoggedIn, setIsLoggedIn, notifyFn}: HeaderProps)
{
	return (
		<>
			{isLoggedIn ? (
				<LoggedInInfo setIsLoggedIn={setIsLoggedIn} />
			) : (
				<section className='header-forms'>
					<article>
						<LoginForm setIsLoggedIn={setIsLoggedIn} notifyFn={notifyFn} />
					</article>
					<article>
						<CreateUserForm notifyFn={notifyFn} />
					</article>
				</section>
			)}
		</>
	);
}

export default Header;

