import { useState, useEffect } from 'react'
import SubmitBlogForm from './SubmitBlogForm'
import Blogs from './Blogs'
import BlogsService from '../services/blogs'

import type { FetchedBlogDTO } from '../services/blogs'

interface BlogsSectionProps {
	isLoggedIn: boolean;
}

function BlogsSection({isLoggedIn}: BlogsSectionProps)
{
	const [ blogsData, setBlogsData ] = useState<FetchedBlogDTO[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const tempBlogs = await BlogsService.fetch();
				setBlogsData(tempBlogs);
			}
			catch (err) {
				console.log("ERROR NOTICE IN BLOGS SECTION", err);
			}
		})();
	}, []);

	return (
		<>
			<h1>Blogs</h1>
			{isLoggedIn && <SubmitBlogForm setBlogsData={setBlogsData} />}
			<Blogs blogsData={blogsData} setBlogsData={setBlogsData} isLoggedIn={isLoggedIn} />
		</>
	);
}

export default BlogsSection;

