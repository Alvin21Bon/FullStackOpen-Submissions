import { useState } from 'react'
import BlogEntryInfoRow from './BlogEntryInfoRow'
import BlogsService from '../services/blogs'
import LoginService from '../services/login'

import type { Dispatch, SetStateAction, MouseEventHandler, ChangeEventHandler } from 'react'
import type { FetchedBlogDTO } from '../services/blogs'

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
		const newLikesAmount = blogData.likes + (event.target.checked ? 1 : -1);

		try {
			await BlogsService.updateLikes(blogData.id, newLikesAmount);
			setBlogsData((prevBlogsData) => prevBlogsData.map((blog) =>
				blog.id === blogData.id ? {...blog, likes: newLikesAmount} : blog
			));
		}
		catch (err) {
			console.log('ERROR NOTICE IN BLOG ENTRY LIKING', err);
		}
	}

	return (
		<>
			<BlogEntryInfoRow>
				{blogData.title}
				{isExpanded ? (
					<button onClick={() => setIsExpanded(false)}>Hide</button>
				) : (
					<button onClick={() => setIsExpanded(true)}>View</button>
				)}
			</BlogEntryInfoRow>

			{isExpanded && (
				<>
					<BlogEntryInfoRow>
						{blogData.url}
					</BlogEntryInfoRow>

					<BlogEntryInfoRow>
						<p>Likes: {blogData.likes}</p>
						{isLoggedIn && <input type='checkbox' onChange={handleLike} />}
					</BlogEntryInfoRow>

					<BlogEntryInfoRow>
						{blogData.author}
					</BlogEntryInfoRow>

					<BlogEntryInfoRow>
						<p>Submitted by {blogData.user.username}</p>
						{isBlogSubmittedByLoggedInUser && <button onClick={handleUnsubmit}>Unsubmit</button>}
					</BlogEntryInfoRow>
				</>
			)}
		</>
	);
}

export default BlogEntry;

