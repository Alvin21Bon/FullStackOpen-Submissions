import Axios from '../axios'
import LoginService from '../login'

import type { StandardError } from '../axios';

// function factory for requests requiring authentication with the login service
const authenticatedAxiosRequest = <T extends (...args: any[]) => Promise<any>>(
	requestFn: T
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> => {
	return (async (...args: Parameters<T>) => {
		if (LoginService.isLoggedOut())
		{
			throw {
				name: 'AuthenticationError',
				message: 'Must be logged in to access guarded endpoints'
			} as StandardError;
		}

		const tempAddAuthHeaderInterceptor = Axios.interceptors.request.use(
			(config) => {
				config.headers.Authorization = LoginService.getUserData()!.authHeader;
				return config;
			},
			(err) => Promise.reject(err)
		);

		try {
			return await requestFn(...args);
		}
		catch (err) {
			throw err;
		}
		finally {
			Axios.interceptors.request.eject(tempAddAuthHeaderInterceptor);
		}
	});
}

export default authenticatedAxiosRequest;

