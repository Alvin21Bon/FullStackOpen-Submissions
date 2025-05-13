import './Toast.css'

import type { AnimationEventHandler } from 'react'

interface ToastProps {
	role: 'alert' | 'status';
	heading: string;
	message: string;
	onAnimationEnd?: AnimationEventHandler<HTMLDivElement>;
}

function Toast({role, heading, message, onAnimationEnd}: ToastProps)
{
	const handleOnlySlideOut:AnimationEventHandler<HTMLDivElement> = (event) => {
		if (event.animationName !== 'slideOut') return;
		if (!onAnimationEnd) return;

		onAnimationEnd(event);
	}

	return (
		<div role={role} className={`toast ${role}`} onAnimationEnd={handleOnlySlideOut}>
			<div className='toast-content'>
				<header>
					<h1>{heading}</h1>
				</header>

				<p>{message}</p>
			</div>
		</div>
	);
}

export default Toast;

