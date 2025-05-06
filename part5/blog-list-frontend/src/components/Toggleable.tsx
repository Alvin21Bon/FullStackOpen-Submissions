import { useState, useImperativeHandle } from 'react'

import type { FC, Ref } from 'react'

export interface ToggleableRefHandle {
	toggleState: () => void;
};

interface ToggleableProps {
	whenOff: FC;
	children: FC;
	defaultOn?: boolean;
	ref: Ref<ToggleableRefHandle>;
};

const Toggleable = ({whenOff, children, defaultOn, ref}: ToggleableProps) => {
	const [state, setState] = useState<'on'|'off'>(defaultOn ? 'on' : 'off');

	const toggleState = () => {
		setState((prevState) => prevState === 'off' ? 'on' : 'off');
	};

	useImperativeHandle(ref, () => {
		return { 
			toggleState
		};
	}, []);

	return state === 'off'
		? whenOff({})
		: children({})
};

export default Toggleable;

