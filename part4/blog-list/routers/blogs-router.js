import { Router } from 'express'
import Blog from '../models/blog.js'
import Logger from '../utils/logger.js'

const blogsRouter = Router();

blogsRouter.get('/', (_req, res, next) => {
	Logger.info('Fetching all blogs...');

	Blog
		.find()
		.then((blogs) => res.json(blogs))
		.catch((err) => next(err));
});

blogsRouter.post('/', (req, res, next) => {
	const newBlog = new Blog(req.body);
	Logger.info(`Adding blog: ${newBlog}...`);

	newBlog
		.save()
		.then((newBlog) => res.status(201).json(newBlog))
		.catch((err) => next(err));
});

export default blogsRouter;
