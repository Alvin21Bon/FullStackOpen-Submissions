import { Mongoose } from '../mongoose.js'

const personSchema = Mongoose.Schema({
	name: {
		type: String,
		minLength: [3, 'Name must be at least 3 characters long'],
		required: [true, 'Name field is required'],
		unique: true
	},
	number: {
		type: String,
		required: [true, 'Number field is required'],
		unique: true,
		validate: {
			validator: (number) => /\d{3}-\d{3}-\d{4}/.test(number),
			message: 'Number must be of the form XXX-XXX-XXXX'
		}
	}
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
