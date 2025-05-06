import { useRef, useImperativeHandle } from 'react'
import Toggleable from './Toggleable'

import type { FC, Ref } from 'react'
import type { ToggleableRefHandle } from './Toggleable'

export type ToggleableFormRefHandle = ToggleableRefHandle;

interface ToggleableFormProps {
	children: FC;
	buttonLabel: string;
	ref?: Ref<ToggleableFormRefHandle>;
};

const ToggleableForm = ({children, buttonLabel, ref}: ToggleableFormProps) => {
	const toggleRef = useRef<ToggleableRefHandle>(null);

	useImperativeHandle(ref, () => {
		return toggleRef.current!;
	}, [toggleRef.current]);

	const button = () => <button onClick={() => toggleRef.current?.toggleState()}>{buttonLabel}</button>;

	return (
		<Toggleable whenOff={button} ref={toggleRef}>
			{children}
		</Toggleable>
	);
};

export default ToggleableForm;

