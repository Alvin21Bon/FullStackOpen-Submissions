import { useState, useEffect } from 'react'
import PersonsServer from './services/persons.js'

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

const EntryText = ({entry}) => <>{entry.name} {entry.number}</>;
const Entry = ({entry, onDeletion}) => 
	<div>
		<EntryText entry={entry} />
		<button onClick={onDeletion}>delete</button>
	</div>

const Numbers = ({persons, onDeletion}) => <>{persons.map(person => <Entry key={person.id} entry={person} onDeletion={onDeletion(person.id)}/>)}</>

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');

	useEffect(() => {
		PersonsServer
			.fetch()
			.then((persons) => {
				console.log('GET', persons, 'fulfilled');
				setPersons(persons);
			})
	}, []);

	const regExpForSearch = new RegExp(`^${newSearch}`, 'i');
	const personsToShow = newSearch !== ''
		? persons.filter((person) => regExpForSearch.test(person.name))
		: persons;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newName === '' || newNumber === '') return;
		else if (/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(newNumber) !== true)
		{
			alert("Number must be of the form: XXX-XXX-XXXX");
			return;
		}

		const newPerson = {
			name: newName,
			number: newNumber
		};
		const personWithSameNewName = persons.find((person) => person.name.toUpperCase() === newName.toUpperCase());

		addPerson:
		if (personWithSameNewName != undefined)
		{
			if (!confirm(`"${newName}" is already in the phonebook, do you wish to modify their number?`)) break addPerson;

			PersonsServer
				.modifyPerson(personWithSameNewName.id, newPerson)
				.then((newlyModifiedPerson) => {
					console.log('PUT', newlyModifiedPerson, 'fulfilled');
					setPersons(persons.map((person) => person.id === personWithSameNewName.id ? newlyModifiedPerson : person));
				})
				.catch((error) => {
					alert("PUT rejected", error.status);
				})
		}
		else
		{
			PersonsServer
				.addPerson(newPerson)
				.then((addedPerson) => {
					console.log('POST', addedPerson, 'fulfilled');
					setPersons([...persons, addedPerson]);
				})
				.catch((error) => {
					alert("POST rejected", error.status);
				});
		}

		setNewName('');
		setNewNumber('');
		setNewSearch('');
	}
	const handleDeletion = (id) => {
		return () => {
			if (!confirm(`Are you sure you want to delete "${persons.find((person) => person.id === id).name}"`)) return;
			PersonsServer
				.deletePerson(id)
				.then((deletedPerson) => {
					console.log('DELETE', deletedPerson, 'fulfilled')
					setPersons(persons.filter((person) => person.id !== deletedPerson.id))
				})
				.catch((error) => {
					alert("DELETE rejected", error.status);
				});
		}
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
			<Numbers persons={personsToShow} onDeletion={handleDeletion}/>
		</div>
	);
};

export default App;
