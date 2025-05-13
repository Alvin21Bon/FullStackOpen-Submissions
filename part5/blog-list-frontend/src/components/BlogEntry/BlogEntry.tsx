import './BlogEntry.css'
import LikeIconUnliked from '../../assets/like-icon-unliked.png'
import LikeIconLiked from '../../assets/like-icon-liked.png'

import { useState } from 'react'
import BlogEntryInfoRow from '../BlogEntryInfoRow/BlogEntryInfoRow'
import BlogsService from '../../services/blogs'
import LoginService from '../../services/login'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

import type { Dispatch, SetStateAction, MouseEventHandler } from 'react'
import type { FetchedBlogDTO } from '../../services/blogs'
import type { NotifyFunction } from '../BloglistApp/BloglistApp'
import type { StandardError } from '../../services/axios'

interface BlogEntryProps {
	blogData: FetchedBlogDTO;
	setBlogsData: Dispatch<SetStateAction<FetchedBlogDTO[]>>;
	isLoggedIn: boolean;
	notifyFn: NotifyFunction;
}

function BlogEntry({blogData, setBlogsData, isLoggedIn, notifyFn}: BlogEntryProps)
{
	const [isExpanded, setIsExpanded] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isUnsubmitModalOpen, setIsUnsubmitModalOpen] = useState(false);

	const isBlogSubmittedByLoggedInUser = 
		isLoggedIn && blogData.user.id === LoginService.getUserData()?.id;

	const handleUnsubmit:MouseEventHandler<HTMLButtonElement> = async (_event) => {
		try {
			await BlogsService.remove(blogData.id);
			setBlogsData((prevBlogsData) => prevBlogsData.filter((blog) => 
				blog.id !== blogData.id
			));

			notifyFn(
				'status',
				'Blog was Successfully Unsubmitted',
				`Your submitted blog titled "${blogData.title}" was successfully unsubmitted`
			);
		}
		catch (err) {
			const e = err as StandardError;
			notifyFn(
				'alert',
				`Blog Could not be Unsubmitted: ${e.name}`,
				`${e.message}. Try unsubmitting again`
			);
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

			const e = err as StandardError;
			notifyFn(
				'alert',
				`Unable to ${originalIsLiked ? 'Unlike' : 'Like'} Blog Post: ${e.name}`,
				e.message
			);
		}
	}

	return (
		<>
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
							{isBlogSubmittedByLoggedInUser && <button onClick={() => setIsUnsubmitModalOpen(true)}>Unsubmit</button>}
						</span>
					</BlogEntryInfoRow>
				</ul>
			</article>

			<ConfirmationModal
				isOpen={isUnsubmitModalOpen}
				setIsOpen={setIsUnsubmitModalOpen}
				heading='Unsubmit Blog Post'
				message={`Are you you want to unsubmit your blog submission titled "${blogData.title}"?`}
				onAccept={handleUnsubmit}
			/>
		</>
	);
}

export default BlogEntry;

