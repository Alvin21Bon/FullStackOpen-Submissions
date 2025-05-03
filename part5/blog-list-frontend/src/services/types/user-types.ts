import type { Blog } from "./blog-types"

export interface User {
	username: string;
	password: string;
	name: string;
	id: string;
};

export type CreateUserDTO = Omit<User, 'id'>;

export interface FetchedUserDTO extends Omit<User, 'password'> {
	blogs: Blog[];
};

