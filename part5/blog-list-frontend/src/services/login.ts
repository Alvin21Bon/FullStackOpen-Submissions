import Axios, { isStandardError, unknownError } from './axios'

// DTOs
interface LoginDTO {
	username: string;
	password: string;
};

interface LoggedInDTO {
	token: string;
	username: string;
	name: string;
};

///////////////////////////////////////////////////////////

const baseUrl = '/login';

type LoggedInUserData = (Omit<LoggedInDTO, 'token'> & { authHeader: string }) | undefined;
let loggedInUserData:LoggedInUserData = undefined;

const login = async (credentials:LoginDTO) => {
	try {
		const payload = (await Axios.post(baseUrl, credentials)).data as LoggedInDTO;
		loggedInUserData = {
			authHeader: `JWT ${payload.token}`,
			username: payload.username,
			name: payload.name
		};
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
};

const logout = () => loggedInUserData = undefined;
const isLoggedOut = () => loggedInUserData === undefined;
const isLoggedIn = () => loggedInUserData !== undefined;
const getUserData = () => loggedInUserData;

export default { login, logout, isLoggedOut, isLoggedIn, getUserData }

