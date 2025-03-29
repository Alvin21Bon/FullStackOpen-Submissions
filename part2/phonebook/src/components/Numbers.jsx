const EntryText = ({entry}) => <>{entry.name} {entry.number}</>;

const Entry = ({entry, onDeletion}) => {
	return (
		<div>
			<EntryText entry={entry} />
			<button onClick={onDeletion}>delete</button>
		</div>
	)
}

const Numbers = ({persons, onDeletion}) => {
	return (
		<>
			{
				persons.map(person => 
					<Entry 
						key={person.id} 
						entry={person} 
						onDeletion={onDeletion(person.id)}
					/>)
			}
		</>
	)
}

export default Numbers;
