import LoginForm from './LoginForm'
import CreateUserForm from './CreateUserForm'
import LoggedInInfo from './LoggedInInfo'

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
				<>
					<article>
						<LoginForm setIsLoggedIn={setIsLoggedIn} />
					</article>
					<article>
						<CreateUserForm />
					</article>
				</>
			)}
		</>
	);
}

export default Header;

