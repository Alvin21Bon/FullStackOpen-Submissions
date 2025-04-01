import { useState, useEffect } from 'react'

import {PhonebookForm, SearchField} from './components/UserInput'
import Numbers from './components/Numbers'
import Notice from './components/Notice'

import PersonsServer from './services/persons.js'


const App = () => {
	const [persons, setPersons] = useState([]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');

	const [newNotice, setNewNotice] = useState();

	useEffect(() => {
		PersonsServer
			.fetch()
			.then((persons) => {
				console.log('GET', persons, 'fulfilled');
				setPersons(persons);
			})
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setNewNotice(undefined);
		}, 5000)
	}, [newNotice])

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
					setNewNotice({text: `Changed number of ${newName}`, type: 'success'});
					setPersons(persons.map((person) => person.id === personWithSameNewName.id ? newlyModifiedPerson : person));
				})
				.catch((error) => {
					setNewNotice({text: `${newName} has already been removed from the server. Code: ${error.status}`, type: 'error'});
				})
		}
		else
		{
			PersonsServer
				.addPerson(newPerson)
				.then((addedPerson) => {
					setNewNotice({text: `Added ${addedPerson.name}`, type: 'success'});
					setPersons([...persons, addedPerson]);
				})
				.catch((error) => {
					setNewNotice({text: `idk bro. Code: ${error.status}`, type: 'error'});
				});
		}

		setNewName('');
		setNewNumber('');
		setNewSearch('');
	}
	const handleDeletion = (id) => {
		const nameOfPersonToDelete = persons.find((person) => person.id === id).name;
		return () => {
			if (!confirm(`Are you sure you want to delete "${nameOfPersonToDelete}"`)) return;
			PersonsServer
				.deletePerson(id)
				.then((deletedPerson) => {
					console.log(deletedPerson);
					setNewNotice({text: `Deleted ${nameOfPersonToDelete}`, type: 'success'});
					setPersons(persons.filter((person) => person.id !== deletedPerson.id))
				})
				.catch((error) => {
					setNewNotice({text: `${nameOfPersonToDelete} was already deleted from the server. Code: ${error.status}`, type: 'error'});
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
			<Notice notice={newNotice} />
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
