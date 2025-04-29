class BlogsError extends Error
{
	statusCode = 400;
	static authHeaderValidationError: typeof AuthHeaderValidationError;
	static authorizationError: typeof AuthorizationError;

	constructor(message?:string, options?:ErrorOptions)
	{
		super(message, options);
		this.name = new.target.name;
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
}

class AuthHeaderValidationError extends BlogsError
{
	override statusCode = 401;
}

class AuthorizationError extends BlogsError
{
	override statusCode = 401;
}

BlogsError.authorizationError = AuthorizationError;
BlogsError.authHeaderValidationError = AuthHeaderValidationError;

export default BlogsError;

