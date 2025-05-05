import Axios, { isStandardError, unknownError } from './axios'

// DTOs
interface LoginDTO {
	username: string;
	password: string;
};

///////////////////////////////////////////////////////////

const baseUrl = '/login';
let authHeader:string|undefined;

const login = async (credentials:LoginDTO) => {
	try {
		const token = (await Axios.post(baseUrl, credentials)).data as string;
		authHeader = `JWT ${token}`;
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
};

const logout = () => authHeader = undefined;
const isLoggedOut = () => authHeader === undefined;
const isLoggedIn = () => authHeader !== undefined;
const getAuthHeader = () => authHeader;

export default { login, logout, isLoggedOut, isLoggedIn, getAuthHeader }

