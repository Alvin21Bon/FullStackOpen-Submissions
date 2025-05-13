import './BloglistApp.css'

import { useState } from 'react';
import Toast from '../Toast/Toast'
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import BlogsSection from '../BlogsSection/BlogsSection'

import type { JSX, AnimationEventHandler } from 'react'

export type NotifyFunction = (role:'status'|'alert', heading:string, message:string) => void;

function BloglistApp()
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [notifications, setNotifications] = useState<JSX.Element[]>([]);

	// for popping from the notifications array when notifcation is dismissed
	const handleNotificationDismissal:AnimationEventHandler<HTMLDivElement> = (_event) => {
		setNotifications((prevNotifications) => {
			const [_, ...resultNotifications] = prevNotifications;
			return resultNotifications;
		});
	}

	// helper function for creating a notification
	const notify:NotifyFunction = (role, heading, message) => {
		setNotifications((prevNotifications) => [
			...prevNotifications,
			<Toast
				role={role}
				heading={heading}
				message={message}
				onAnimationEnd={handleNotificationDismissal}
				key={Date.now()}
			/>
		]);
	}

	return (
		<>
			<header className="webpage-header">
				<Header 
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
					notifyFn={notify}
				/>
			</header>
			<main>
				<BlogsSection
					isLoggedIn={isLoggedIn}
					notifyFn={notify}
				/>
			</main>

			<aside>
				<Notifications notifications={notifications} />
			</aside>
		</>
	);
}

export default BloglistApp;

