import { beforeEach, test, expect, beforeAll } from 'vitest'
import Supertest from 'supertest'
import App from '../app.js'
import Blog from '../models/blog.js'
import { Mongoose, connectDB } from '../utils/mongoose.js'

import testInitialBlogs from './test-initial-blogs.json' 
import testBlogs from './test-blogs.json'

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

test('retrieved Blog documents should have id prop', async () => {
	try {
		await Blog.insertOne(testInitialBlogs[0]);
	} catch (err) {
		throw err;
	}

	const res = 
		await Supertest(App)
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /json/);

	expect(res.body[0].id).toBeDefined();
	expect(res.body[0]._id).toBeUndefined();
});

test('POST should add document to database', async () => {
	try {
		let blogs = await Blog.find();
		var initialBlogsLength = blogs.length;
	}
	catch (err) {
		throw err;
	}

	const res = 
		await Supertest(App)
		.post('/api/blogs')
		.send(testInitialBlogs[0])
		.expect(201)
		

	try {
		let blogs = await Blog.find();
		var newBlogsLength = blogs.length;
	}
	catch (err) {
		throw err;
	}

	expect(newBlogsLength).toBe(initialBlogsLength + 1);

	const cleanedResponseBody = res.body;
	delete cleanedResponseBody.id;
	expect(cleanedResponseBody).toEqual(testInitialBlogs[0]);
});

test('Blogs should have default likes of 0', async () => {
	const res = 
		await Supertest(App)
		.post('/api/blogs')
		.send(testBlogs.noLikes)
		.expect(201)
		
	expect(res.body.likes).toBe(0);
});

test('Blogs with missing title should error', async () => {
	await Supertest(App)
		.post('/api/blogs')
		.send(testBlogs.noTitle)
		.expect(400);
});

test('Blogs with missing URL should error', async () => {
	await Supertest(App)
		.post('/api/blogs')
		.send(testBlogs.noURL)
		.expect(400);
});
