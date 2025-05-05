import Axios, { isStandardError, unknownError } from './axios'

import type { Blog } from './blogs'

// DTOs
interface User {
	username: string;
	password: string;
	name: string;
	id: string;
};
export type SanitizedUser = Omit<User, 'password'>;

type CreateUserDTO = Omit<User, 'id'>;
type CreatedUserDTO = SanitizedUser;

interface FetchedUserDTO extends SanitizedUser {
	blogs: Blog[];
};

///////////////////////////////////////////////////////////

const baseUrl = '/api/users';

const create = async (newUser:CreateUserDTO) => {
	try {
		return (await Axios.post(baseUrl, newUser)).data as CreatedUserDTO;
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
};

const fetch = async () => {
	try {
		return (await Axios.get(baseUrl)).data as FetchedUserDTO[];
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
};

export default { create, fetch }

