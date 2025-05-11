import './InputField.css'

import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

interface InputFieldProps {
	id: string;
	label: string;
	type?: HTMLInputTypeAttribute;
	value?: string|number|readonly string[];
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

function InputField({id, label, type='text', value, onChange}: InputFieldProps)
{
	return (
		<label htmlFor={id} className='text-input-field'>
			<span>{label}</span>
			<input id={id} type={type} value={value} onChange={onChange} />
		</label>
	)
}

export default InputField;

