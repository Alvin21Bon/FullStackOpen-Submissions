import { Router } from 'express'
import Blog from '../models/blog.js'
import Logger from '../utils/logger.js'

const blogsRouter = Router();

blogsRouter.get('/', async (_req, res, next) => {
	Logger.info('Fetching all blogs...');

	try {
		const blogs = await Blog.find();
		res.json(blogs);
	}
	catch (err) {
		next(err);
	}
});

blogsRouter.post('/', async (req, res, next) => {
	const newBlog = new Blog(req.body);
	Logger.info(`Adding blog: ${newBlog}...`);

	try {
		const createdBlog = await newBlog.save();
		res.status(201).json(createdBlog);
	}
	catch (err) {
		next(err);
	}
});

export default blogsRouter;
