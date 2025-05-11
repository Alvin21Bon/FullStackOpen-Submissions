import './BlogSection.css'

import { useState, useEffect } from 'react'
import SubmitBlogForm from '../SubmitBlogForm/SubmitBlogForm'
import Blogs from '../Blogs/Blogs'
import BlogsService from '../../services/blogs'

import type { FetchedBlogDTO } from '../../services/blogs'

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
		<section>
			<h1 className='main-header'>Blogs</h1>
			{isLoggedIn && <article><SubmitBlogForm setBlogsData={setBlogsData} /></article>}
			<section aria-label="Blog List">
				<Blogs blogsData={blogsData} setBlogsData={setBlogsData} isLoggedIn={isLoggedIn} />
			</section>
		</section>
	);
}

export default BlogsSection;

