import { it, expect, describe, beforeEach } from 'vitest'
import Supertest from 'supertest'
import App from '../../app.js'
import User from '../../models/user.js'
import Bcrypt from 'bcrypt'

import { Mongoose, connectDB } from '../../utils/mongoose.js'

import type { UserCreateDTO } from '../../routers/DTOs/users-router-dtos.js'

import initialUsersJSON from './test-initial-users.json'
const testInitialUsers = initialUsersJSON as UserCreateDTO[];
import testUsers from './test-users.json'

const addUser = async (user: UserCreateDTO) => {
	return (await Supertest(App)
		.post('/api/users')
		.send(user)
		.expect(201)
		.expect('Content-Type', /json/)).body;
}
const getUsers = async () => {
	return (await Supertest(App)
		.get('/api/users')
		.expect(200)
		.expect('Content-Type', /json/)).body;
}

describe('when querying the database', () => {
	it('should not error with find queries', async () => {
		try { await User.find() }
		catch (err) { throw err }

		try { await User.find({ username: 'testtestfornovalidqueryresults' }) }
		catch (err) { throw err }
	});
});

describe('when creating a user', () => {

	it('should not error', async () => {
		try { await addUser(testInitialUsers[0])}
		catch (err) { throw err }
	})

	it('should add to the users collection', async () => {
		const user = testInitialUsers[0];

		const initialUsersLength = (await User.find()).length;
		await addUser(user);
		const resultUsersLength = (await User.find()).length;

		expect(resultUsersLength).toBe(initialUsersLength + 1);

		const createdUser = await User.find({ username: user.username, name: user.name });
		expect(createdUser).toBeDefined();
	});

	it('should hash the given password', async () => {
		const user = testInitialUsers[0];
		await addUser(user);

		const createdUser = await User.findOne({ username: user.username });
		expect(Bcrypt.compare(user.password, createdUser!.passwordHash)).toBeTruthy();
	});

	it('should error if no username is given', async () => {
		await Supertest(App)
			.post('/api/users')
			.send(testUsers.noUsername)
			.expect(400);
	});

	it('should error if no password is given', async () => {
		await Supertest(App)
			.post('/api/users')
			.send(testUsers.noPassword)
			.expect(400);
	});

	it('should error on duplicate usernames', async () => {
		// unsure why, but this test fails if batch tested, and it doesn't fail if ran by itself
		// so, this line is needed because this fixes the batch testing for some reason
		await Mongoose.connection.close();
		await connectDB();

		await Supertest(App)
			.post('/api/users')
			.send(testUsers.normal)
			.expect(201);

		await Supertest(App)
			.post('/api/users')
			.send(testUsers.normal)
			.expect(409);
	});

	it('should error on less than minimum length username', async () => {
		await Supertest(App)
			.post('/api/users')
			.send(testUsers.lessThanMinLengthUsername)
			.expect(400)
	});

	it('should error on less than minimum length password', async() => {
		await Supertest(App)
			.post('/api/users')
			.send(testUsers.lessThanMinLengthPassword)
			.expect(400)
	});
});

describe('when fetching the users', () => {
	beforeEach(async () => {
		for (let user of testInitialUsers)
		{
			await addUser(user);
		}
	});

	it('should succeed and return JSON', async () => {
		try { await getUsers() }
		catch (err) { throw err }
	});

	it('should not contain their password hash', async () => {
		const users = await getUsers();
		expect('passwordHash' in users[0]).toBeFalsy();
	});

	it('should match the length of inserted test initital users', async () => {
		expect((await getUsers()).length).toBe(testInitialUsers.length);
	});
});
