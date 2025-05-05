import { it, expect, describe, beforeEach } from 'vitest'
import Supertest from 'supertest'
import App from '../../app.js'
import Blog, { BlogSchema } from '../../models/blog.js'
import User from '../../models/user.js'
import { isDocument } from '@typegoose/typegoose'

import type { BlogCreateDTO } from '../../routers/DTOs/blogs-router.dtos.js'
import type { DocumentType } from '@typegoose/typegoose'

import testInitialBlogs from './test-initial-blogs.json' 
import testBlogs from './test-blogs.json'
import testUsers from './test-users.json'

const addBlog = async (blog:BlogCreateDTO, authHeader:string) => {
	return (await Supertest(App)
		.post('/api/blogs')
		.send(blog)
		.set('Authorization', authHeader));
};

const addUserAndGetAuthHeader = async (user:any) => {
	const request = Supertest(App);
	await request
		.post('/api/users')
		.send(user.user);

	const res = 
		await request
		.post('/login')
		.send(user.login);

	const token = res.text;
	return `JWT ${token}`;
}

type BlogDocument = DocumentType<BlogSchema>;

describe('when querying the database', () => {
	it('should not error with find operations', async () => {
		try { await Blog.find() }
		catch (err) { throw err }

		try { await Blog.findOne() }
		catch (err) { throw err }
	});

});

describe('when creating blogs', () => {
	let testUser:any;
	let authorizationHeader:string;

	beforeEach(async () => {
		const testUserToUse = testUsers[0];
		testUser = testUserToUse.user;
		authorizationHeader = await addUserAndGetAuthHeader(testUserToUse);
	});

	it('should be guarded by tokens', async () => {
		const blog = testInitialBlogs[0];

		await Supertest(App)
		.post('/api/blogs')
		.send(blog)
		.expect(401);
	});

	it('should succeed if valid blog data and valid token', async () => {
		const blog = testInitialBlogs[0];

		await Supertest(App)
		.post('/api/blogs')
		.send(blog)
		.set('Authorization', authorizationHeader)
		.expect(201);
	});

	it('should add to the blogs collection', async () => {
		const blog = testInitialBlogs[0];

		const initialBlogsLength = (await Blog.find()).length;
		await addBlog(blog, authorizationHeader);
		const resultBlogsLength = (await Blog.find()).length;

		expect(resultBlogsLength).toBe(initialBlogsLength + 1);

		const createdBlog = await Blog.findOne({ author: blog.author, title: blog.title, url: blog.url });
		expect(createdBlog).toBeDefined();
	});

	it('should set the correct user ID', async () => {
		const blog = testInitialBlogs[0];
		const expectedUserId = (await User.findOne({ username: testUser.username, name: testUser.name }))!.id;

		const createdBlog:BlogDocument = (await addBlog(blog, authorizationHeader)).body;
		expect(createdBlog.user).toBe(expectedUserId);
	});

	it('should default likes to 0', async () => {
		const createdBlog:BlogDocument = (await addBlog(testBlogs.noLikes, authorizationHeader)).body;
		expect(createdBlog.likes).toBe(0);
	});

	it('should error if no title is supplied', async () => {
		await Supertest(App)
			.post('/api/blogs')
			.send(testBlogs.noTitle)
			.set('Authorization', authorizationHeader)
			.expect(400);
	});

	it('should error if no URL is supplied', async () => {
		await Supertest(App)
			.post('/api/blogs')
			.send(testBlogs.noURL)
			.set('Authorization', authorizationHeader)
			.expect(400);
	});
});

describe('when retrieving blogs', () => {
	let testUser: any;

	beforeEach(async () => {
		const testUserToUse = testUsers[0];
		testUser = testUserToUse.user;
		const authorizationHeader = await addUserAndGetAuthHeader(testUserToUse);

		for (let blog of testInitialBlogs)
		{
			await addBlog(blog, authorizationHeader);
		}
	});

	it('should succeed and return json', async () => {
		await Supertest(App)
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /json/);
	});

	it('should match the length of test initial blogs', async () => {
		const res = await Supertest(App).get('/api/blogs');
		expect(res.body.length).toBe(testInitialBlogs.length);
	});

	it('should return blogs with cleaned data', async () => {
		const res = await Supertest(App).get('/api/blogs');
		expect(res.body[0].id).toBeDefined();
		expect(res.body[0]._id).toBeUndefined();
		expect(res.body[0].__v).toBeUndefined();
	});

	it('should populate with user data', async () => {
		const blogs:BlogDocument[] = (await Supertest(App).get('/api/blogs')).body;

		for (let blog of blogs)
		{
			expect(isDocument(blog.user)).toBeDefined();
		}

		if (isDocument(blogs[0].user)) // type narrowing
		{
			const expectedUser = testUser;
			expect(blogs[0].user.username).toBe(expectedUser.username);
			expect(blogs[0].user.name).toBe(expectedUser.name);
		}
	})
})

describe('when deleting blogs', () => {
	let blogToDelete:BlogDocument;
	let authorizationHeader:string;

	beforeEach(async () => {
		const blog = testInitialBlogs[0];
		authorizationHeader = await addUserAndGetAuthHeader(testUsers[0]);
		blogToDelete = (await addBlog(blog, authorizationHeader)).body;
	});

	it('should be guarded by tokens', async () => {
		await Supertest(App)
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(401);
	});

	it('should error if token for another user is given', async () => {
		const anotherAuthorizationHeader = await addUserAndGetAuthHeader(testUsers[1]);
		await Supertest(App)
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', anotherAuthorizationHeader)
			.expect(401);
	});

	it('should succeed when given correct token', async () => {
		await Supertest(App)
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', authorizationHeader)
			.expect(204);
	});

	it('should remove from the blogs collection', async () => {
		await Supertest(App)
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', authorizationHeader);

		expect(await Blog.findById(blogToDelete.id)).toBeFalsy();
	});
});

describe('when updating blogs', () => {
	let blogToUpdate:BlogDocument;
	const blogToUpdateWith = testBlogs.normal;
	let authorizationHeader:string;

	beforeEach(async () => {
		authorizationHeader = await addUserAndGetAuthHeader(testUsers[0]);
		for (let blog of testInitialBlogs)
		{
			await addBlog(blog, authorizationHeader);
		}

		blogToUpdate = (await Blog.findOne())!;
	});

	it('should be guarded by tokens', async () => {
		await Supertest(App)
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdateWith)
			.expect(401);
	});

	it('should error if token for another user is given', async () => {
		const anotherAuthorizationHeader = await addUserAndGetAuthHeader(testUsers[1]);
		await Supertest(App)
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdateWith)
			.set('Authorization', anotherAuthorizationHeader)
			.expect(401);
	});

	it('should succeed and return JSON when given correct token', async () => {
		await Supertest(App)
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdateWith)
			.set('Authorization', authorizationHeader)
			.expect(200)
			.expect('Content-Type', /json/);
	});

	it('should update the target blog', async () => {
		await Supertest(App)
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdateWith)
			.set('Authorization', authorizationHeader);

		const updatedBlog = await Blog.findById(blogToUpdate.id);
		// check if all properties of blogToUpdateWith are now set in the updatedBlog
		for (let key in blogToUpdateWith)
		{
			expect(updatedBlog![key]).toBe(blogToUpdateWith[key]);
		}
	});

	describe('to update only their likes', () => {
		const randomLikesUpdate = {
			likes: Math.floor(Math.random() * 1000)
		};
		
		it('should succeed with any valid token and return JSON', async () => {
			const anotherAuthorizationHeader = await addUserAndGetAuthHeader(testUsers[1]);
			await Supertest(App)
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(randomLikesUpdate)
				.set('Authorization', anotherAuthorizationHeader)
				.expect(200)
				.expect('Content-Type', /json/);
		});

		it('should only update the likes of the target blog', async () => {
			const originalBlog = await Blog.findById(blogToUpdate.id).lean();

			await Supertest(App)
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(randomLikesUpdate)
				.set('Authorization', authorizationHeader);

			const updatedBlog = await Blog.findById(blogToUpdate.id).lean();

			for (let key in updatedBlog)
			{
				if (key !== 'likes')
				{
					expect(updatedBlog![key]).toStrictEqual(originalBlog![key]);
				}
			}
		});
	});
});

