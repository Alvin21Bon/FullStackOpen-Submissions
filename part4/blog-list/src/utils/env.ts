import 'dotenv-flow/config'

export default {
	MONGODB_URI: process.env['MONGODB_URI'] as string,
	PORT: process.env['PORT'] as string,
	JWT_SECRET: process.env['JWT_SECRET'] as string
} as const;

