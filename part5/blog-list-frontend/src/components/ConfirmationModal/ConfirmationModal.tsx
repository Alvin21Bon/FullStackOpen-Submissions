import './ConfirmationModal.css'

import Modal from "../Modal/Modal";

import type { Dispatch, SetStateAction, MouseEventHandler } from 'react'

interface ConfirmationModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	heading?: string;
	message: string;
	onAccept: MouseEventHandler<HTMLButtonElement>;
}

function ConfirmationModal({isOpen, setIsOpen, heading, message, onAccept}: ConfirmationModalProps)
{
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			{heading && (
				<header className='confirmation-modal-heading'>
					<h1>{heading}</h1>
				</header>
			)}

			<section className='confirmation-modal-message'>
				<p>{message}</p>
			</section>

			<footer className='confirmation-modal-buttons'>
				<button 
					autoFocus 
					onClick={() => setIsOpen(false)} 
					className='confirmation-modal-cancel-button'
				>
					Cancel
				</button>
				<button 
					onClick={(event) => {
						setIsOpen(false);
						onAccept(event);
					}} 
					className='confirmation-modal-confirm-button'
				>
					Confirm
				</button>
			</footer>
		</Modal>
	);
}

export default ConfirmationModal;

