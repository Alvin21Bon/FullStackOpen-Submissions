import './SubmitBlogForm.css'

import { useState } from 'react'
import InputField from '../InputField/InputField'
import BlogsService from '../../services/blogs'
import LoginService from '../../services/login'

import type { Dispatch, SetStateAction, FormEventHandler } from 'react'
import type { FetchedBlogDTO } from '../../services/blogs'

interface SubmitBlogFormProps {
	setBlogsData: Dispatch<SetStateAction<FetchedBlogDTO[]>>;
}

function SubmitBlogForm({setBlogsData}: SubmitBlogFormProps)
{
	const [ isExpanded, setIsExpanded ] = useState(false);
	const [ titleInput, setTitleInput ] = useState('');
	const [ authorInput, setAuthorInput ] = useState('');
	const [ urlInput, setUrlInput ] = useState('');

	const setUnexpanded = () => {
		setTitleInput('');
		setAuthorInput('');
		setUrlInput('');
		setIsExpanded(false);
	}

	const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const newBlog = {
			title: titleInput,
			author: authorInput,
			url: urlInput
		};

		try {
			const createdBlog = await BlogsService.create(newBlog);
			const { authHeader: _, ...loggedInUserData } = LoginService.getUserData()!;

			const populatedCreatedBlog:FetchedBlogDTO = {
				...createdBlog,
				user: loggedInUserData
			};
			setBlogsData((prevBlogsData) => [...prevBlogsData, populatedCreatedBlog]);

			setUnexpanded();
		}
		catch (err) {
			console.log("ERROR NOTICE IN SUBMIT BLOG FORM", err);
		}
	}

	return (
		<>
			{isExpanded ? (
				<form onSubmit={handleSubmit} className='submit-blog-form'>
					<h2>Submit a Blog</h2>
					<InputField
						label='Title: '
						id='submit-blog-form-title-field'
						value={titleInput}
						onChange={(event) => setTitleInput(event.target.value)}
					/>
					<InputField
						label='Author: '
						id='submit-blog-form-author-field'
						value={authorInput}
						onChange={(event) => setAuthorInput(event.target.value)}
					/>
					<InputField
						label='Url: '
						id='submit-blog-form-url-field'
						type='url'
						value={urlInput}
						onChange={(event) => setUrlInput(event.target.value)}
					/>
					<div className='submit-button'>
						<button onClick={setUnexpanded}>Cancel</button>
						<button type='submit'>Submit</button>
					</div>
				</form>
			) : (
				<button onClick={() => setIsExpanded(true)} className='submit-blog-button'>Submit a Blog</button>
			)}
		</>
	);
}

export default SubmitBlogForm;

