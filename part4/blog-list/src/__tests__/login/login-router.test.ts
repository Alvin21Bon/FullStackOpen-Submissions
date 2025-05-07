import { it, expect, describe, beforeEach } from 'vitest'
import Supertest from 'supertest'
import App from '../../app.js'
import JWT from 'jsonwebtoken'
import User from '../../models/user.js'
import Env from '../../utils/env.js'

import type { UserCreateDTO } from '../../routers/DTOs/users-router-dtos.js'
import type { JWTPayloadDTO, LoginResponseDTO } from '../../routers/DTOs/login-router-dtos.js'
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

		const payload:LoginResponseDTO = res.body;
		JWT.verify(payload.token, Env.JWT_SECRET);
	});

	it('sends a JWT with correct userId data on correct logins', async () => {
		const res = await Supertest(App)
			.post('/login')
			.send(testLogins.normal);

		const payload:LoginResponseDTO = res.body;
		const jwtPayload = JWT.verify(payload.token, Env.JWT_SECRET) as JWTPayloadDTO;

		const user = await User.findById(jwtPayload.id);
		expect(user!.username).toBe(testUser.username);
		expect(user!.name).toBe(testUser.name);
	});

	it('sends the correct username and name data for logged in user', async () => {
		const res = await Supertest(App)
			.post('/login')
			.send(testLogins.normal);

		const payload:LoginResponseDTO = res.body;
		expect(testUser.username).toBe(payload.username);
		expect(testUser.name).toBe(payload.name);
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

