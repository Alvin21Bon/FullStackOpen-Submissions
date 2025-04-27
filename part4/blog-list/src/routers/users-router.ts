import { Router } from 'express'
import User from '../models/user.js'
import Bcrypt from 'bcrypt'
import Logger from '../utils/logger.js'
import { Error } from 'mongoose'

import type { UserCreateDTO } from './DTOs/users-router-dtos.js'
import type { Request } from 'express'

const usersRouter = Router();

usersRouter.post('/', async (req:Request<{}, {}, UserCreateDTO>, res, next) => {
	const userData = req.body;
	const saltRounds = 12;

	if (!("password" in userData)) 
	{
		next(new Error.ValidationError)
		return;
	}
	if (userData.password == undefined || userData.password.length < 3)
	{
		next(new Error.ValidationError);
		return;
	}

	const passwordHash = await Bcrypt.hash(userData.password, saltRounds);

	const newUser = new User({
		username: userData.username,
		passwordHash: passwordHash,
		name: userData.name
	});

	try {
		const createdUser = await newUser.save();
		Logger.info(`Created new user: ${createdUser.id}!`);

		res.status(201).json(createdUser);
	}
	catch (err) { next(err) }
});

usersRouter.get('/', async (_req, res, next) => {
	Logger.info('Fetching all users...');

	try {
		const users = await User.find();
		res.json(users);
	}
	catch (err) { next(err) }
})

export default usersRouter;
