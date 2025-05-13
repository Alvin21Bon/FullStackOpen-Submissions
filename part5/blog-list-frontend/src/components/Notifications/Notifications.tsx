import './Notifications.css'

import type { JSX } from 'react'

interface NotificationsProps {
	notifications: JSX.Element[];
};

function Notifications({notifications}: NotificationsProps)
{
	return (
		<div className='notifications'>
			{notifications}
		</div>
	);
}

export default Notifications;

