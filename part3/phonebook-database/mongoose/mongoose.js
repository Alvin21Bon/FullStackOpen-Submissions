import Mongoose from 'mongoose'

Mongoose.pluralize(null);
Mongoose.set('strictQuery', true);

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
	Mongoose
		.connect(URI)
		.catch((error) => {
			console.log("Failed to connect to database:", error);
			process.exit(1);
		});
};

export {Mongoose, connectDB}
