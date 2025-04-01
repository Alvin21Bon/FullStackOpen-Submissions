const TextInput = ({textLabel, textId, inputText, onKeystroke, inputType}) => {
	return (
		<div>
			<label htmlFor={textId}>{textLabel}: </label>
			<input id={textId} type={inputType} value={inputText} onChange={onKeystroke} />
		</div>
	)
}

export const PhonebookForm = ({nameText, numberText, onNameKeystroke, onNumberKeystroke, onSubmit}) => {
	return (
		<form onSubmit={onSubmit}>
			<TextInput 
				textLabel='Name' 
				textId='name-field' 
				inputText={nameText} 
				onKeystroke={onNameKeystroke} 
				inputType='text'
			/>
			<TextInput 
				textLabel='Number'
				textId='number-field'
				inputText={numberText}
				onKeystroke={onNumberKeystroke}
				inputType='tel'
			/>
			<button type='submit'>add</button>
		</form>
	);
}

export const SearchField = ({searchText, onSearchKeystroke}) => {
	return (
		<TextInput 
			textLabel='Filter' 
			textId='search-field' 
			inputText={searchText} 
			onKeystroke={onSearchKeystroke} 
			inputType='text' 
		/>
	);
}

