import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>;
const StatLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>;

const Statistics = ({stats}) => {
	const noFeedback = {
		good: 0,
		neutral: 0,
		bad: 0
	};
	if (JSON.stringify(noFeedback) === JSON.stringify(stats)) return <p>No feedback given</p>;

	const numPositive = stats.good;
	const numNeutral = stats.neutral;
	const numNegative = stats.bad;
	const numTotal = numPositive + numNeutral + numNegative;
	const average = (numPositive - numNegative) / numTotal;
	const percentagePositive = numPositive / numTotal * 100;


	return (
		<table>
			<StatLine text='good' value={stats.good} />
			<StatLine text='neutral' value={stats.neutral} />
			<StatLine text='bad' value={stats.bad} />
			<StatLine text='all' value={numTotal} />
			<StatLine text='average' value={average} />
			<StatLine text='positive' value={percentagePositive} />
		</table>
	);
}

const App = () => {
	const [stats, setStats] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
	});

	const incrementGood = () => setStats({...stats, good: stats.good + 1});
	const incrementNeutral = () => setStats({...stats, neutral: stats.neutral + 1});
	const incrementBad = () => setStats({...stats, bad: stats.bad + 1});

	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={incrementGood} text='good' />
			<Button onClick={incrementNeutral} text='neutral' />
			<Button onClick={incrementBad} text='bad' />

			<h1>statistics</h1>
			<Statistics stats={stats} />
		</div>
	);
}

export default App;
