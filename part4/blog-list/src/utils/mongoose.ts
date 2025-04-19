import Mongoose from 'mongoose'
import Logger from './logger.js'
import Env from './env.js'

Mongoose.set('strictQuery', true);

const connectDB = async () => {
	if (Mongoose.connection.readyState === 1) return;

	Logger.info(`Connecting to database ${Env.MONGODB_URI}...`);
	try {
		await Mongoose.connect(Env.MONGODB_URI);
		Logger.info('Connection to database established');
	}
	catch (err) {
		Logger.error('Failed to connect to database:');
		Logger.error(err);
		Logger.error('Terminating...');
		process.exit(1);
	}
}

export {Mongoose, connectDB};
