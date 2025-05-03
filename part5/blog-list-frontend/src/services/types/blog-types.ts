import { User } from "./user-types"

export interface Blog {
	title: string,
	author: string,
	url: string,
	likes?: number
	user: string;
	id: string;
};

export type CreateBlogDTO = Omit<Blog, 'id' | 'user'>;

export interface FetchedBlogDTO extends Omit<Blog, 'user'> {
	user: User;
};

