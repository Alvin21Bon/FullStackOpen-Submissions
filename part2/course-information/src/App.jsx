import Course from './components/Course'

const App = () => {
	class Part
	{
        	constructor(id, name, numExercises) 
        	{
        		this.id = id;
        		this.name = name;
        		this.numExercises = numExercises;
        	}
	}

	const courses = [
		{
			id: 1,
			name: 'Half Stack application development',
			parts: [
					new Part(1, 'Fundamentals of React', 10)
				, 	new Part(2, 'Using props to pass data', 7)
				, 	new Part(3, 'State of a component', 14)
				, 	new Part(4, 'Well made React code', 99)
				, 	new Part(5, 'Minecraft', 1)
				]
		},
		{
			id: 2,
			name: 'Server Side Development',
			parts: [
					new Part(1, 'HTTP', 5)
				, 	new Part(2, 'Nodejs', 4)
				, 	new Part(3, 'Databases', 14)
				]
		},
	];

	return <Course courses={courses} />
}

export default App;
