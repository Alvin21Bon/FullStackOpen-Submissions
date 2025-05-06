import type { FormEventHandler, ReactNode } from 'react'

export interface FormProps {
	onSubmit: FormEventHandler<HTMLFormElement>;
	children: ReactNode;
}

const Form = ({onSubmit, children}: FormProps) => {
	return (
		<form onSubmit={onSubmit}>
			{children}
		</form>
	)
};

export default Form;

