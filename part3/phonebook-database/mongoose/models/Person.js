import { Mongoose } from '../mongoose.js'

const personSchema = Mongoose.Schema({
	name: String,
	number: String
});

personSchema.set('toJSON', {
	transform: (document, object) => {
		object.id = document.id;
		delete object._id;
		delete object.__v;
	}
});

const Person = Mongoose.model('persons', personSchema);

export default Person;
