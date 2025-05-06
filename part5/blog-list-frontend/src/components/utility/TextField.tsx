import { useState, useImperativeHandle } from 'react'

import type { HTMLInputTypeAttribute, Ref, ChangeEventHandler } from "react";

export type TextFieldRefHandle = string;

interface TextFieldProps {
	children: string;
	fieldId: string;
	inputType?: HTMLInputTypeAttribute;
	ref: Ref<TextFieldRefHandle>;
};

const TextField = ({children, fieldId, inputType = 'text', ref}: TextFieldProps) => {
	const [inputText, setInputText] = useState('');

	useImperativeHandle(ref, () => {
		return inputText;
	}, [inputText]);

	const handleKeystroke:ChangeEventHandler<HTMLInputElement> = (event) => {
		setInputText(event.currentTarget.value);
	};

	return (
		<>
			<label htmlFor={fieldId}>{children}</label>
			<input id={fieldId} type={inputType} value={inputText} onChange={handleKeystroke} />
		</>
	);
};

export default TextField;

