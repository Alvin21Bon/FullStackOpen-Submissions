import { useState } from 'react'

const TextInput = ({textLabel, textId, inputText, onKeystroke, inputType}) => {
	return (
		<div>
			<label htmlFor={textId}>{textLabel}: </label>
			<input id={textId} type={inputType} value={inputText} onChange={onKeystroke} />
		</div>
	)
}

const PhonebookForm = ({nameText, numberText, onNameKeystroke, onNumberKeystroke, onSubmit}) => {
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

const SearchField = ({searchText, onSearchKeystroke}) => 
	<TextInput 
		textLabel='Filter' 
		textId='search-field' 
		inputText={searchText} 
		onKeystroke={onSearchKeystroke} 
		inputType='text' 
	/>;

const Entry = ({entry}) => <p>{entry.name} {entry.number}</p>;
const Numbers = ({persons}) => <>{persons.map(person => <Entry key={person.name} entry={person} />)}</>

const App = () => {
	const [persons, setPersons] = useState([
		{name: 'Arto Hellas', number:'999-999-9999'}
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');

	const regExpForSearch = new RegExp(`^${newSearch}`, 'i');
	const personsToShow = newSearch !== ''
		? persons.filter((person) => regExpForSearch.test(person.name))
		: persons;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newName === '' || newNumber === '') return;
		else if (persons.find((person) => person.name.toUpperCase() === newName.toUpperCase()))
		{
			alert(`${newName} is already in the phonebook`);
			return;
		}
		else if (/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(newNumber) !== true)
		{
			alert("Number must be of the form: XXX-XXX-XXXX");
			return;
		}

		setPersons([...persons, {name: newName, number: newNumber}]);
		setNewName('');
		setNewNumber('');
		setNewSearch('');
	}

	const handleNameKeystroke = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberKeystroke = (event) => {
		setNewNumber(event.target.value);
	};
	const handleSearchKeystroke = (event) => {
		setNewSearch(event.target.value);
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<SearchField 
				searchText={newSearch}
				onSearchKeystroke={handleSearchKeystroke}
			/>

			<h2>Add Entry</h2>
			<PhonebookForm 
				nameText={newName}
				numberText={newNumber}
				onNameKeystroke={handleNameKeystroke}
				onNumberKeystroke={handleNumberKeystroke}
				onSubmit={handleSubmit}
			/>

			<h2>Numbers</h2>
			<Numbers persons={personsToShow} />
		</div>
	);
};

export default App;
