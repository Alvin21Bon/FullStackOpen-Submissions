import { beforeEach, test, expect, beforeAll } from 'vitest'
import Supertest from 'supertest'
import App from '../app.js'
import Blog from '../models/blog.js'
import { Mongoose, connectDB } from '../utils/mongoose.js'

import testInitialBlogs from './test-initial-blogs.json' 

beforeAll(async () => {
	try {
		await connectDB();
	}
	catch (err) {
		throw(err);
	}
})

beforeEach(async () => {
	try {
		await Mongoose.connection.db!.dropDatabase();
	}
	catch (err) {
		throw(err);
	}
});

test('GET should match length of test initial blogs', async () => {
	try {
		await Blog.insertMany(testInitialBlogs);
	} catch (err) {
		throw err;
	}

	const res = 
		await Supertest(App)
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /json/);

	expect(res.body.length).toBe(testInitialBlogs.length);
});
