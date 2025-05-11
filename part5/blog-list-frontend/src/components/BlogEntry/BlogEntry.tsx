import './BlogEntry.css'

import { useState } from 'react'
import BlogEntryInfoRow from '../BlogEntryInfoRow/BlogEntryInfoRow'
import BlogsService from '../../services/blogs'
import LoginService from '../../services/login'

import type { Dispatch, SetStateAction, MouseEventHandler, ChangeEventHandler } from 'react'
import type { FetchedBlogDTO } from '../../services/blogs'

interface BlogEntryProps {
	blogData: FetchedBlogDTO;
	setBlogsData: Dispatch<SetStateAction<FetchedBlogDTO[]>>;
	isLoggedIn: boolean;
}

function BlogEntry({blogData, setBlogsData, isLoggedIn}: BlogEntryProps)
{
	const [isExpanded, setIsExpanded] = useState(false);

	const isBlogSubmittedByLoggedInUser = 
		isLoggedIn && blogData.user.id === LoginService.getUserData()?.id;

	const handleUnsubmit:MouseEventHandler<HTMLButtonElement> = async (_event) => {
		try {
			await BlogsService.remove(blogData.id);
			setBlogsData((prevBlogsData) => prevBlogsData.filter((blog) => 
				blog.id !== blogData.id
			));
		}
		catch (err) {
			console.log('ERROR NOTICE IN BLOG ENTRY UBSUBMIT', err);
		}
	}

	const handleLike:ChangeEventHandler<HTMLInputElement> = async (event) => {
		const originalLikesAmount = blogData.likes;
		const newLikesAmount = originalLikesAmount + (event.target.checked ? 1 : -1);

		setBlogsData((prevBlogsData) => prevBlogsData.map((blog) =>
			blog.id === blogData.id ? {...blog, likes: newLikesAmount} : blog
		));

		try {
			await BlogsService.updateLikes(blogData.id, newLikesAmount);
		}
		catch (err) {
			setBlogsData((prevBlogsData) => prevBlogsData.map((blog) =>
				blog.id === blogData.id ? {...blog, likes: originalLikesAmount} : blog
			));
			console.log('ERROR NOTICE IN BLOG ENTRY LIKING', err);
		}
	}

	return (
		<article className='blog-entry'>
			<header>
				<h2 className='blog-title'>{blogData.title}</h2>
				<button onClick={() => setIsExpanded((prev) => !prev)}>
					{isExpanded ? 'Hide' : 'View'}
				</button>
			</header>

			<ul>
				{isExpanded && (
					<>
						<BlogEntryInfoRow>
							<p>{blogData.url}</p>
						</BlogEntryInfoRow>

						<BlogEntryInfoRow>
							<p>Likes: <strong>{blogData.likes}</strong></p>
							{isLoggedIn && <input type='checkbox' onChange={handleLike} />}
						</BlogEntryInfoRow>

						<BlogEntryInfoRow>
							<p>{blogData.author}</p>
						</BlogEntryInfoRow>

						<BlogEntryInfoRow>
							<p>Submitted by {blogData.user.username}</p>
							{isBlogSubmittedByLoggedInUser && <button onClick={handleUnsubmit}>Unsubmit</button>}
						</BlogEntryInfoRow>
					</>
				)}
			</ul>
		</article>
	);
}

export default BlogEntry;

