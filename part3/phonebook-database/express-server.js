import Express from 'express'

import morganMiddleware from './logging/morgan.js'
import Person from './mongoose/models/Person.js'

const App = Express();
App.use(Express.static('dist'));
App.use(Express.json());
App.use(morganMiddleware);

App.get('/api/persons', (_req, res, next) => {
	Person
		.find()
		.then((persons) => res.json(persons))
		.catch((error) => next(error));
});

App.get('/info', (_req, res, next) => {
	Person
		.find()
		.then((persons) => {
			res.send(
				`
					<h1>Phone has info for ${persons.length} people</h1>
					<p>${new Date()}</p>
				`
			);
		})
		.catch((error) => next(error));
});

App.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;

	Person
		.findById(id)
		.then((person) => person ? res.json(person) : res.status(404).json({error: `Person with id "${id}" not found`}))
		.catch((error) => next(error));
});

App.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	const newNumber = req.body.number;

	Person
		.findByIdAndUpdate(id, {$set: {number: newNumber}}, { new: true })
		.then((updatedPerson) => updatedPerson ? res.json(updatedPerson): res.status(404).json({error: `Person with id "${id}" not found`}))
		.catch((error) => next(error));
});

App.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;

	Person
		.findByIdAndDelete(id)
		.then((deletedPerson) => deletedPerson ? res.json(deletedPerson) : res.status(404).json({error: `Person with id "${id}" not found`}))
		.catch((error) => next(error));
})

App.post('/api/persons', async (req, res, next) => {
	const body = req.body;

	if (!body.name || !body.number) return res.status(400).json({error: 'name and number must be defined'});

	const personLookup = await Person.find({name: body.name}).exec();
	if (personLookup.length > 0) return res.status(400).json({error: 'names must be unique'});

	const newPerson = new Person({
		name: body.name,
		number: body.number
	});

	newPerson
		.save()
		.then((newPerson) => res.json(newPerson))
		.catch((error) => next(error));
});

App.use((_req, res) => {
	res.status(404).send('<h1>404 page not found</h1>');
});

App.use((error, _req, res, _next) => {
	res.status(500).json({erorr: 'Failed database operation', info: error});
});

export default App;
