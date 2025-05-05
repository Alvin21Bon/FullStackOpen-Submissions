import Axios, { isStandardError, unknownError } from './axios'
import authenticatedAxiosRequest from './utility/authenticated-request'

import type { SanitizedUser } from './users'

// DTOs
export interface Blog {
	title: string,
	author: string,
	url: string,
	likes: number
	user: string;
	id: string;
};

interface CreateBlogDTO extends Omit<Blog, 'id' | 'user' | 'likes'> {
	likes?: number;
};
type CreatedBlogDTO = Blog;

type UpdateBlogDTO = CreateBlogDTO;
type UpdatedBlogDTO = Blog;

interface FetchedBlogDTO extends Omit<Blog, 'user'> {
	user: SanitizedUser;
};

///////////////////////////////////////////////////////////

const baseUrl = '/api/blogs';

const create = authenticatedAxiosRequest(async (newBlog:CreateBlogDTO) => {
	try {
		return (await Axios.post(baseUrl, newBlog)).data as CreatedBlogDTO;
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
});

const update = authenticatedAxiosRequest(async (id:string, blogToUpdateWith:UpdateBlogDTO) => {
	try {
		return (await Axios.put(`${baseUrl}/${id}`, blogToUpdateWith)).data as UpdatedBlogDTO;
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
});

const remove = authenticatedAxiosRequest(async (id:string) => {
	try {
		await Axios.delete(`${baseUrl}/${id}`);
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
});

const fetch = async () => {
	try {
		return (await Axios.get(baseUrl)).data as FetchedBlogDTO[];
	}
	catch (err) {
		if (isStandardError(err)) throw err;

		throw unknownError;
	}
};

export default { create, update, remove, fetch }

