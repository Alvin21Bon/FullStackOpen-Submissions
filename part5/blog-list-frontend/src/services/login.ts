import Axios, { isStandardError, unknownError } from './axios'

// DTOs
interface LoginDTO {
	username: string;
	password: string;
};

///////////////////////////////////////////////////////////

const baseUrl = '/login';
let authHeader:string|undefined;
let username:string|undefined;

const login = async (credentials:LoginDTO) => {
	try {
		const token = (await Axios.post(baseUrl, credentials)).data as string;
		authHeader = `JWT ${token}`;
		username = credentials.username;
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
};

const logout = () => {
	authHeader = undefined;
	username = undefined;
};
const isLoggedOut = () => authHeader === undefined;
const isLoggedIn = () => authHeader !== undefined;
const getAuthHeader = () => authHeader;
const getUsername = () => username;

export default { login, logout, isLoggedOut, isLoggedIn, getAuthHeader, getUsername }

