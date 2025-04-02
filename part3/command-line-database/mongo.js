import Mongoose from 'mongoose'
Mongoose.set('strictQuery', true);
Mongoose.pluralize(null);

let isFetch = false;
if (process.argv.length < 3)
{
	console.log('Password must be supplied as first argument');
	process.exit(1);
}
else if (process.argv.length == 3) isFetch = true;
else if (process.argv.length < 5) 
{
	console.log('Number must be supplied as third argument after the name');
	process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://Alvin21Bon:${password}@testcluster.5jidrw9.mongodb.net/phonebook?retryWrites=true&w=majority&appName=TestCluster`
Mongoose
	.connect(url)
	.catch((error) => {
		console.log("Unable to connect to database");
		console.log(error);
		process.exit(1);
	});

const personSchema = Mongoose.Schema({
	name: String,
	number: String
});

const Person = Mongoose.model('persons', personSchema);

if (isFetch)
{
	Person
		.find()
		.then((result) => {
			console.log('Phonebook:')
			result.forEach((person) => {
				console.log(person.name, person.number);
			})
		})
		.catch((error) => {
			console.log('Unable to query phonebook entries from database');
			console.log(error);
		})
		.finally(() => Mongoose.connection.close());
}
else
{
	const newPerson = new Person({
		name: process.argv[3],
		number: process.argv[4]
	});

	newPerson
		.save()
		.then(() => {
			console.log(`Added ${newPerson.name} number ${newPerson.number} to phonebook`);
		})
		.catch((error) => {
			console.log('Unable to add entry to phonebook database');
			console.log(error);
		})
		.finally(() => Mongoose.connection.close());
}
