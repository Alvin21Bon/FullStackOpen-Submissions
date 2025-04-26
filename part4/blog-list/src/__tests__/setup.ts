import { beforeAll, beforeEach } from 'vitest'
import { Mongoose, connectDB } from '../utils/mongoose.js'

beforeAll(async () => {
	try { await connectDB() }
	catch (err) { throw err }
});

beforeEach(async () => {
	try { await Mongoose.connection.db!.dropDatabase(); }
	catch (err) { throw err }
});
