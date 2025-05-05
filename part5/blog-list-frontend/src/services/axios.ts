import Axios from 'axios'

export interface StandardError {
	name: string;
	statusCode?: number;
	message: string;
};

export const unknownError: StandardError = {
	name: 'UnknownError',
	message: 'An unkown error was encountered'
};

export const isStandardError = (error: unknown): error is StandardError => {
	if (typeof error !== 'object' || error === null) return false;

	const object = error as Record<string, unknown>;

	return (
		typeof object['name'] === 'string' && 
		(typeof object['statusCode'] === 'undefined' || typeof object['statusCode'] === 'number') &&
		typeof object['message'] === 'string'
	);
};

const axiosSession = Axios.create();

axiosSession.interceptors.response.use(
	(res) => res,
	(err) => {
		if (Axios.isAxiosError(err)) 
			return Promise.reject(err.response?.data as StandardError);

		return Promise.reject(unknownError);
	}
);

export default axiosSession;
