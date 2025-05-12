import './BlogEntry.css'
import LikeIconUnliked from '../../assets/like-icon-unliked.png'
import LikeIconLiked from '../../assets/like-icon-liked.png'

import { useState } from 'react'
import BlogEntryInfoRow from '../BlogEntryInfoRow/BlogEntryInfoRow'
import BlogsService from '../../services/blogs'
import LoginService from '../../services/login'

import type { Dispatch, SetStateAction, MouseEventHandler } from 'react'
import type { FetchedBlogDTO } from '../../services/blogs'

interface BlogEntryProps {
	blogData: FetchedBlogDTO;
	setBlogsData: Dispatch<SetStateAction<FetchedBlogDTO[]>>;
	isLoggedIn: boolean;
}

function BlogEntry({blogData, setBlogsData, isLoggedIn}: BlogEntryProps)
{
	const [isExpanded, setIsExpanded] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

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

	const handleLike:MouseEventHandler<HTMLButtonElement> = async (_event) => {
		const originalIsLiked = isLiked;
		const originalLikesAmount = blogData.likes;
		const newLikesAmount = originalLikesAmount + ( !originalIsLiked ? 1 : -1);

		setBlogsData((prevBlogsData) => prevBlogsData.map((blog) =>
			blog.id === blogData.id ? {...blog, likes: newLikesAmount} : blog
		));

		try {
			setIsLiked(!originalIsLiked);
			await BlogsService.updateLikes(blogData.id, newLikesAmount);
		}
		catch (err) {
			setBlogsData((prevBlogsData) => prevBlogsData.map((blog) =>
				blog.id === blogData.id ? {...blog, likes: originalLikesAmount} : blog
			));
			setIsLiked(originalIsLiked);
			console.log('ERROR NOTICE IN BLOG ENTRY LIKING', err);
		}
	}

	return (
		<article className='blog-entry'>
			<header className='blog-header'>
				<h2 className='blog-title'>{blogData.title}</h2>
				<button onClick={() => setIsExpanded((prev) => !prev)}>
					{isExpanded ? 'Hide' : 'View'}
				</button>
			</header>

			<ul className={`blog-content${isExpanded ? ' expanded' : ''}`}>
				<BlogEntryInfoRow>
					<p>
						<strong>URL: </strong>
						{blogData.url}
					</p>
				</BlogEntryInfoRow>

				<BlogEntryInfoRow>
					<span className='blog-likes-row'>
						<p>
							<strong>Likes: </strong>
							{blogData.likes}
						</p>
						{isLoggedIn && (
							<button onClick={handleLike} className='like-button'>
								<img 
									src={isLiked ? LikeIconLiked : LikeIconUnliked}
									alt={isLiked ? 'like-button-filled' : 'like-button-unfilled'}
									className='like-icon'
								/>
							</button>
						)}
					</span>
				</BlogEntryInfoRow>

				<BlogEntryInfoRow>
					<p>
						<strong>Author: </strong>
						{blogData.author}
					</p>
				</BlogEntryInfoRow>

				<BlogEntryInfoRow>
					<span className='blog-submission-info'>
						<p>
							Submitted by <em>{blogData.user.username}</em>
						</p>
						{isBlogSubmittedByLoggedInUser && <button onClick={handleUnsubmit}>Unsubmit</button>}
					</span>
				</BlogEntryInfoRow>
			</ul>
		</article>
	);
}

export default BlogEntry;

