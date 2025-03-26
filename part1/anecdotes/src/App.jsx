import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const Anecdote = ({content}) => <><p>{content.text}</p> <p>has {content.numVotes} votes</p></>;

const App = () => {
	class AnecdoteClass {
		constructor(text)
		{
			this.text = text;
			this.numVotes = 0;
		}
	};

	const anecdotesTextArray = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	];
	const numOfAnecdotes = anecdotesTextArray.length;
	const getRandomSelection = () => Math.trunc(Math.random() * numOfAnecdotes);

	const [selected, setSelected] = useState(getRandomSelection());
	const [anecdoteArray, setAnecdotes] = useState((() => {
		let anecdoteArray = [];
		for (let text of anecdotesTextArray)
		{
			anecdoteArray.push(new AnecdoteClass(text));
		}
		return anecdoteArray;
	})());

	const changeSelected = () => setSelected(getRandomSelection());
	const incrementVote = (anecdoteIdx) => () => setAnecdotes(() => {
		const copy = [...anecdoteArray];
		copy[anecdoteIdx].numVotes++;
		return copy;
	});

	const mostVotesIdx = (() => {
		let mostVotesIdx = 0;
		for (let idx = 0; idx < numOfAnecdotes; idx++)
		{
			if (anecdoteArray[idx].numVotes > anecdoteArray[mostVotesIdx].numVotes) mostVotesIdx = idx;
		}
		return mostVotesIdx;
	})();

	return (
		<>
			<h1>Anecdote of the day</h1>
			<Anecdote content={anecdoteArray[selected]} />
			<Button onClick={incrementVote(selected)} text='vote' />
			<Button onClick={changeSelected} text='next anecdote' />

			<h1>Anecdote with the most votes</h1>
			<Anecdote content={anecdoteArray[mostVotesIdx]} />
		</>
	);
};

export default App;
