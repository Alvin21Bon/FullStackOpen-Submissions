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

blogsRouter.delete('/:id', async (req, res, next) => {
	const id = req.params.id;
	Logger.info(`Deleting blog with id: ${id}...`);

	try {
		await Blog.findByIdAndDelete(id);
		res.status(204).send();
	}
	catch (err) {
		next (err);
	}
});

blogsRouter.put('/:id', async (req, res, next) => {
	const id = req.params.id;
	const newBlog = req.body;
	Logger.info(`Updated blog with id: ${id} with: ${newBlog}...`)

	try {
		const updatedPerson = await Blog.findByIdAndUpdate(id, newBlog, { new: true, runValidators: true });
		res.status(200).json(updatedPerson); 
	}
	catch (err) {
		next(err);
	}
})

export default blogsRouter;
