const Header = ({course}) => {
	return (
		<h1>{course}</h1>
	);
}

const Part = ({name, numExercises}) => {
	return (
		<p>{name} {numExercises}</p>
	);
}

const Content = ({parts}) => {
	const partsHTML = parts.map((partObject) => {
		return <Part name={partObject.name} numExercises={partObject.numExercises} />
	});
	return (
		<>
			{partsHTML}
		</>
	);
}

const Total = ({parts}) => {
	let total = 0;
	for (let partObject of parts) total += partObject.numExercises;

	return (
		<p>Number of exercises {total}</p>
	);
};


const App = () => {
	class Part
	{
        	constructor(name, numExercises) 
        	{
        		this.name = name;
        		this.numExercises = numExercises;
        	}
	}

	const Course = {
		name: 'Half Stack application development',
		parts: [new Part('Fundamentals of React', 10)
			, new Part('Using props to pass data', 7)
			, new Part('State of a component', 14)],
	};

	return (
		<div>
			<Header course={Course.name} />
			<Content parts={Course.parts} />
			<Total parts={Course.parts} />
		</div>
	);
}

export default App;
