const Header = ({course}) => <h2>{course}</h2>;
const ListItem = ({name, value}) => <p>{name} {value}</p>;
const Part = ({name, numExercises}) => <ListItem name={name} value={numExercises} />;
const Total = ({parts}) => {
	return <ListItem name='Number of exercises' value={parts.reduce((sum, part) => sum + part.numExercises, 0)} />;
};

const Content = ({parts}) => {
	const partsHTML = parts.map((partObject) => <Part key={partObject.id} name={partObject.name} numExercises={partObject.numExercises} />);

	return (
		<>
			{partsHTML}
			<Total parts={parts} />
		</>
	);
}

const Course = ({courses}) => {
	return (
		<>
			<h1>Web Development Corriculum</h1>

			{courses.map(course => {
				return (
					<div key={course.id}>
						<Header course={course.name} />
						<Content parts={course.parts} />
					</div>
				);
			})}
		</>
	)
};

export default Course;
