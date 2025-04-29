import { Router } from 'express'
import User from '../models/user.js'
import JWT from 'jsonwebtoken'
import Bcrypt from 'bcrypt'
import LoginError from './errors/login-router-errors.js'
import Env from '../utils/env.js'
import Logger from '../utils/logger.js'

import type { LoginDTO } from './DTOs/login-router-dtos.js';
import type { Request } from 'express'

const loginRouter = Router();

loginRouter.post('/', async (req:Request<{}, {}, LoginDTO>, res, next) => {
	const loginData = req.body;
	if 
	(
		!('username' in loginData) || loginData.username == undefined ||
		!("password" in loginData) || loginData.password == undefined
	)
	{
		next(new LoginError.validationError('username and password must be defined'));
		return;
	}

	const user = await User.findOne({username: loginData.username});
	if (user == undefined || !(await Bcrypt.compare(loginData.password, user.passwordHash)))
	{
		next(new LoginError.unauthorizedError('Incorrect username or password'));
		return;
	}

	Logger.info(`${loginData.username} successfully authorized!`);

	const token = JWT.sign({id: user._id}, Env.JWT_SECRET, { expiresIn: '1h' });
	res.status(200).set('Content-Type', 'text/plain').send(token);
});

export default loginRouter;
