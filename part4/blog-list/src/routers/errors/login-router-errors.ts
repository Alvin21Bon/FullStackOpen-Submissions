class LoginError extends Error 
{
	statusCode = 400;
	static validationError: typeof ValidationError;
	static unauthorizedError: typeof UnauthorizedError;

	constructor(message?:string, options?:ErrorOptions)
	{
		super(message, options);
		this.name = new.target.name;
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
}

class ValidationError extends LoginError
{
	override statusCode = 400;
}

class UnauthorizedError extends LoginError
{
	override statusCode = 401;
}

LoginError.validationError = ValidationError;
LoginError.unauthorizedError = UnauthorizedError;

export default LoginError;
