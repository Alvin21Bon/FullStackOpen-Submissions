import Mongoose from 'mongoose'
import Logger from './logger.js'
import Env from './env.js'

Mongoose.pluralize(null);
Mongoose.set('strictQuery', true);

const connectDB = async () => {
	Logger.info(`Connecting to database ${Env.MONGODB_URI}...`);
	Mongoose
		.connect(Env.MONGODB_URI)
		.then(() => Logger.info('Connection to database established'))
		.catch((error) => {
			Logger.error('Failed to connect to database:');
			Logger.error(error);
			Logger.error('Terminating...');
			process.exit(1);
		});
}

export {Mongoose, connectDB};
