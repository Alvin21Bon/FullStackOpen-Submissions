import { Router } from 'express'
import Blog from '../models/blog.js'
import BlogsError from './errors/blogs.router.errors.js'
import JWT from 'jsonwebtoken'
import Logger from '../utils/logger.js'
import Env from '../utils/env.js'

import type { BlogCreateDTO } from './DTOs/blogs-router.dtos.js'
import type { JWTPayloadDTO } from './DTOs/login-router-dtos.js'
import type { ObjectId } from 'mongoose'

declare global {
	namespace Express {
		interface Request {
			userId?: ObjectId;
		}
	}
}

const blogsRouter = Router();

// authentication
blogsRouter.use(async (req, _res, next) => {
	if (req.method === "GET")
	{
		next();
		return;
	}

	// validating the auth header
	const authHeader = req.headers.authorization;
	if (!authHeader)
	{
		next(new BlogsError.authHeaderValidationError('Authorization header missing'));
		return;
	}

	const splitAuthHeader = authHeader.split(' ');
	if (splitAuthHeader.length !== 2)
	{
		next(new BlogsError.authHeaderValidationError('Authorization header malformed'));
		return;
	}

	const authSchema = splitAuthHeader[0]!;
	const token = splitAuthHeader[1]!;

	// verifying the token
	switch (authSchema)
	{
		case 'JWT':
			const payload = JWT.verify(token, Env.JWT_SECRET) as JWTPayloadDTO | null;
			if (!payload)
			{
				next(new BlogsError.authorizationError('JWT is invalid'));
				return;
			}

			req.userId = payload.id;
			break;
		default:
			next(new BlogsError.authHeaderValidationError(`Authorization schema ${authSchema} is not supported`));
			return;
	}

	Logger.info(`User ${req.userId} authenticated!`);
	next();
});

blogsRouter.get('/', async (_req, res, next) => {
	Logger.info('Fetching all blogs...');

	try {
		const blogs = await Blog.find().populate('user');
		res.json(blogs);
	}
	catch (err) {
		next(err);
	}
});

blogsRouter.post('/', async (req, res, next) => {
	const blogData = req.body as BlogCreateDTO;
	const newBlog = new Blog({...blogData, user: req.userId});
	Logger.info(`Adding blog: ${newBlog}...`);

	try {
		const createdBlog = await newBlog.save();
		res.status(201).json(createdBlog);
	}
	catch (err) {
		next(err);
	}
});

blogsRouter.delete('/:id', async (req, res, next) => {
	const blogId = req.params.id;
	try { var blog = await Blog.findById(blogId) }
	catch (err) { 
		next(err);
		return;
	}

	if (blog!.user.toString() !== req.userId!.toString())
	{
		next(new BlogsError.authorizationError('Deleting other user blogs is not allowed'));
		return;
	}

	Logger.info(`Deleting blog with id: ${blogId}...`);

	try {
		await blog!.deleteOne();
		res.status(204).send();
	}
	catch (err) {
		next(err);
	}
});

blogsRouter.put('/:id', async (req, res, next) => {
	const blogId = req.params.id;
	try { var blog = await Blog.findById(blogId) }
	catch (err) { 
		next(err);
		return;
	}

	const updateEntireBlog = async (blogToUpdateWith:BlogCreateDTO) => {
		if (blog!.user.toString() !== req.userId!.toString())
		{
			next(new BlogsError.authorizationError('Updating other user blogs is not allowed'));
			return;
		}

		Logger.info(`Updating blog with id: ${blogId} with: ${blogToUpdateWith}...`)
		blog!.set(blogToUpdateWith);

		try {
			await blog!.save();
			res.status(200).json(blog); 
		}
		catch (err) {
			next(err);
		}
	};

	const onlyUpdateLikes = async (likesToUpdateBlogWith:{ likes: number }) => {
		Logger.info(`Updating blog with id: ${blogId} to change likes to: ${likesToUpdateBlogWith.likes}...`);
		blog!.set(likesToUpdateBlogWith);

		try {
			await blog!.save();
			res.status(200).json(blog);
		}
		catch (err) {
			next(err);
		}
	};

	const requestPayload = req.body;
	if (typeof requestPayload !== 'object' || requestPayload === null)
	{
		next(new BlogsError.requestPayloadError('Updated blog must be an object'));
		return;
	}

	if (Object.keys(requestPayload).length === 1 && typeof requestPayload['likes'] === 'number')
	{
		onlyUpdateLikes(requestPayload);
		return;
	}

	updateEntireBlog(requestPayload);
});

export default blogsRouter;
