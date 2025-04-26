import { test, expect } from 'vitest'
import Supertest from 'supertest'
import App from '../../app.js'
import Blog from '../../models/blog.js'

import testInitialBlogs from './test-initial-blogs.json' 
import testBlogs from './test-blogs.json'

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

test('DELETE should remove from the database', async () => {
	try { await Blog.insertMany([...testInitialBlogs]); }
	catch (err) { throw err }

	const newBlog = new Blog(testBlogs.normal);

	try { await newBlog.save() }
	catch (err) { throw err}

	try {
		const blogs = await Blog.find();
		var initialBlogsLength = blogs.length;
	}
	catch (err) {
		throw err
	}

	await Supertest(App)
		.delete(`/api/blogs/${newBlog.id}`)
		.expect(204)

	try {
		const blogs = await Blog.find();
		var newBlogsLength = blogs.length;
	}
	catch (err) {
		throw err;
	}

	expect(newBlogsLength).toBe(initialBlogsLength - 1);

	try { var findByIdRes = await Blog.findById(newBlog.id) }
	catch (err) { throw err }

	expect(findByIdRes).toBeFalsy();
});

test('PUT should update the database', async () => {
	try { await Blog.insertMany(testInitialBlogs) }
	catch (err) { throw err }

	try { var blogToUpdate = await Blog.findOne() }
	catch (err) {throw err}

	const newBlog = testBlogs.normal;
	await Supertest(App)
		.put(`/api/blogs/${blogToUpdate!.id}`)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /json/);

	try { var updatedBlog = await Blog.findById(blogToUpdate!.id) }
	catch (err) { throw err }

	expect(updatedBlog).not.toEqual(blogToUpdate);

	const updatedBlogObject = updatedBlog!.toJSON();
	delete updatedBlogObject['id'];
	expect(updatedBlogObject).toEqual(newBlog);
});
