import Logger from './logger.js'
import { Router } from 'express'
import type { RequestHandler, ErrorRequestHandler } from 'express'

const requestLogger:RequestHandler = (req, _res, next) => {
	Logger.info('---------');
	Logger.info('ROUTE:', req.method, req.path);
	Logger.info('BODY:', req.body);
	Logger.info('---------');

	next();
}

const unknownEndpoint:RequestHandler = (_req, res) => {
	res.status(404).send('<h1>404 page not found</h1>');
}

const errorRouter = Router();
errorRouter.use(((err, _req, _res, next) => {
	Logger.error('---------');
	Logger.error('ERROR:');
	Logger.error(err);
	Logger.error('---------');
	next(err);
}) as ErrorRequestHandler);

// Mongoose
errorRouter.use(((err:unknown, _req, res, next) => {
	if (!(err instanceof Error))
	{
		next(err);
		return;
	}

	switch (err.name)
	{
		case 'MongooseError':
			res.status(500)
			break;
		case 'CastError':
			res.status(400)
			break;
		case 'ValidationError':
			res.status(400)
			break;
		default:
			next(err);
			return;
	}

	res.json(err);
}) as ErrorRequestHandler);

// unknwon error
errorRouter.use(((err, _req, res, _next) => {
	res.status(500).json(err);
}) as ErrorRequestHandler);

export default {requestLogger, unknownEndpoint, errorRouter};
