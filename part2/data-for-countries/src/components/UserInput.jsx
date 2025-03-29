const Input = ({label, type, value, onChange, onClick}) => {
	return (
		<div>
			<label htmlFor={label}>{label} </label>
			<input id={label} type={type} value={value} onChange={onChange} onClick={onClick}/>
		</div>
	);
}

export default Input;
