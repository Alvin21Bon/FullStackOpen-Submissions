import Express from 'express'
import Morgan from 'morgan'

const app = Express();
app.use(Express.json());

Morgan.token('postData', (req) => {
	if (req.method === 'POST') return JSON.stringify(req.body);
	else return '';
});

app.use(Morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

let persons = [
	{
		id: '1',
		name: 'Jaqualis',
		number: '299-192-1929'
	},
	{
		id: '2',
		name: 'Tyrone',
		number: '283-129-1929'
	},
	{
		id: '3',
		name: 'Michael',
		number: '123-123-1234'
	},
];

app.get('/api/persons', (req, res) => {
	console.log('GET /api/persons');
	res.json(persons);
});

app.get('/info', (req, res) => {
	res.send(
		`
			<h1>Phone has info for ${persons.length} people</h1>
			<p>${new Date()}</p>
		`
	);
});

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	const person = persons.find((person) => person.id === id);

	if (!person) return res.status(404).send(`<h1>Person with id "${id}" not found</h1>`);
	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
})

app.post('/api/persons', (req, res) => {
	const body = req.body;
	if (!body.name || !body.number) return res.status(400).json({error: 'name and number must be defined'});
	else if (persons.find((person) => person.name === body.name)) return res.status(400).json({error: 'names must be unique'});

	const id = Math.floor(Math.random() * 100000);
	const newPerson = {
		id: String(id),
		name: body.name,
		number: body.number
	};

	persons = persons.concat(newPerson);
	res.json(newPerson);
});

app.use((req, res) => {
	res.status(404).send('<h1>404 page not found</h1>');
});

const port = 3001;
app.listen(port);

console.log(`Server listening on port ${port}`);
