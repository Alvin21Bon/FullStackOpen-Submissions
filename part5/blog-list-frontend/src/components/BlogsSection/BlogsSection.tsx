import './BlogSection.css'

import { useState, useEffect } from 'react'
import SubmitBlogForm from '../SubmitBlogForm/SubmitBlogForm'
import Blogs from '../Blogs/Blogs'
import BlogsService from '../../services/blogs'

import type { FetchedBlogDTO } from '../../services/blogs'
import type { NotifyFunction } from '../BloglistApp/BloglistApp'
import type { StandardError } from '../../services/axios'

interface BlogsSectionProps {
	isLoggedIn: boolean;
	notifyFn: NotifyFunction;
}

function BlogsSection({isLoggedIn, notifyFn}: BlogsSectionProps)
{
	const [ blogsData, setBlogsData ] = useState<FetchedBlogDTO[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const tempBlogs = await BlogsService.fetch();
				setBlogsData(tempBlogs);
			}
			catch (err) {
				const e = err as StandardError;
				notifyFn(
					'alert',
					`Failed to Fetch Bloglist: ${e.name}`,
					`${e.message}. Try refreshing the page`
				);
			}
		})();
	}, []);

	return (
		<section>
			<h1 className='main-header'>Blogs</h1>
			{isLoggedIn && <article><SubmitBlogForm setBlogsData={setBlogsData} notifyFn={notifyFn} /></article>}
			<section aria-label="Blog List">
				<Blogs blogsData={blogsData} setBlogsData={setBlogsData} isLoggedIn={isLoggedIn} notifyFn={notifyFn} />
			</section>
		</section>
	);
}

export default BlogsSection;

