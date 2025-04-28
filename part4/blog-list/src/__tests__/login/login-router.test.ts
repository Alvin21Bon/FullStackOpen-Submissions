import { it, expect, describe, beforeEach } from 'vitest'
import Supertest from 'supertest'
import App from '../../app.js'
import JWT from 'jsonwebtoken'
import User from '../../models/user.js'
import Env from '../../utils/env.js'

import type { UserCreateDTO } from '../../routers/DTOs/users-router-dtos.js'
import type { ObjectId } from 'mongoose'

import testUserJSON from './test-user.json'
const testUser = testUserJSON as UserCreateDTO;
import testLogins from './test-logins.json'

beforeEach(async () => {
	await Supertest(App)
		.post('/api/users')
		.send(testUser)
		.expect(201)
});

describe('when logging in', () => {
	it('successfully validates correct logins', async () => {
		await Supertest(App)
			.post('/login')
			.send(testLogins.normal)
			.expect(200);
	});

	it('sends a verifiable JWT on correct logins', async () => {
		const res = await Supertest(App)
			.post('/login')
			.send(testLogins.normal);

		const token = res.text;
		JWT.verify(token, Env.JWT_SECRET);
	});

	it('sends a JWT with correct userId data on correct logins', async () => {
		const res = await Supertest(App)
			.post('/login')
			.send(testLogins.normal);

		const token = res.text;
		const payload = JWT.verify(token, Env.JWT_SECRET) as { id: ObjectId }; // TODO: DTO for this needed

		const user = await User.findById(payload.id);
		expect(user!.username).toBe(testUser.username);
		expect(user!.name).toBe(testUser.name);
	});

	it('errors on no supplied username', async () => {
		await Supertest(App)
			.post('/login')
			.send(testLogins.noUsername)
			.expect(400);
	});

	it('errors on no supplied password', async () => {
		await Supertest(App)
			.post('/login')
			.send(testLogins.noPassword)
			.expect(400);
	});

	it('errors on incorrect username', async () => {
		await Supertest(App)
			.post('/login')
			.send(testLogins.wrongUsername)
			.expect(401);
	});

	it('errors on incorrect password', async () => {
		await Supertest(App)
			.post('/login')
			.send(testLogins.wrongPassword)
			.expect(401);
	});
});
