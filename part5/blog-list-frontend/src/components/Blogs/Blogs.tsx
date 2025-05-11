import BlogEntry from '../BlogEntry/BlogEntry'

import type { Dispatch, SetStateAction } from 'react'
import type { FetchedBlogDTO } from '../../services/blogs'

interface BlogsProps {
	blogsData: FetchedBlogDTO[];
	setBlogsData: Dispatch<SetStateAction<FetchedBlogDTO[]>>;
	isLoggedIn: boolean;
}

function Blogs({blogsData, setBlogsData, isLoggedIn}: BlogsProps)
{
	const blogsSortedByMostLikes = [...blogsData].sort((leftBlog, rightBlog) => rightBlog.likes - leftBlog.likes);

	return (
		<>
			{blogsSortedByMostLikes.map((blog) => (
				<BlogEntry
					key={blog.id}
					isLoggedIn={isLoggedIn}
					blogData={blog}
					setBlogsData={setBlogsData}
				/>
			))}
		</>
	);
}

export default Blogs

