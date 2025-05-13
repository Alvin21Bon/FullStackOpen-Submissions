import BlogEntry from '../BlogEntry/BlogEntry'

import type { Dispatch, SetStateAction } from 'react'
import type { FetchedBlogDTO } from '../../services/blogs'
import type { NotifyFunction } from '../BloglistApp/BloglistApp'

interface BlogsProps {
	blogsData: FetchedBlogDTO[];
	setBlogsData: Dispatch<SetStateAction<FetchedBlogDTO[]>>;
	isLoggedIn: boolean;
	notifyFn: NotifyFunction;
}

function Blogs({blogsData, setBlogsData, isLoggedIn, notifyFn}: BlogsProps)
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
					notifyFn={notifyFn}
				/>
			))}
		</>
	);
}

export default Blogs

