import './Modal.css'

import { useRef, useEffect } from 'react'

import type { ReactNode, ReactEventHandler, Dispatch, SetStateAction } from 'react'

interface ModalProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
	onClose?: () => void;
}

function Modal({isOpen, setIsOpen, children, onClose}: ModalProps)
{
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen)
			dialog.showModal();
		else
			dialog.close();
	}, [isOpen])

	// for non user defined closing methods (pressing escape)
	const handleClose:ReactEventHandler<HTMLDialogElement> = (_event) => {
		if (onClose) onClose();
		setIsOpen(false);
	}

	return (
		<dialog ref={dialogRef} onClose={handleClose}>
			{children}
		</dialog>
	);
}

export default Modal;

