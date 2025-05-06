import { useRef } from 'react'
import ToggleableForm from './ToggleableForm'
import Form from './utility/Form'
import TextField from './utility/TextField'
import BlogsService from '../services/blogs'

import type { ToggleableFormRefHandle } from './ToggleableForm'
import type { FormEventHandler } from 'react'
import type { TextFieldRefHandle } from './utility/TextField'

const BlogSubmitField = () => {
	const toggleableFormRef = useRef<ToggleableFormRefHandle>(null);
	const titleFieldRef = useRef<TextFieldRefHandle>('');
	const authorFieldRef = useRef<TextFieldRefHandle>('');
	const urlFieldRef = useRef<TextFieldRefHandle>('');

	const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const blogDetails = {
			title: titleFieldRef.current,
			author: authorFieldRef.current,
			url: urlFieldRef.current
		};

		try {
			await BlogsService.create(blogDetails);
			toggleableFormRef.current?.toggleState();
		}
		catch {
			console.log('ERRORS HERE IN BLOGS SUBMIT FIELD');
		}
	};

	const submitBlogForm = () => {
		return (
			<>
				<h2>Submit a Blog</h2>
				<Form onSubmit={handleSubmit}>
					<TextField fieldId='title-field' ref={titleFieldRef}>
						Title: 
					</TextField>

					<br/>

					<TextField fieldId='author-field' ref={authorFieldRef}>
						Author: 
					</TextField>

					<br/>

					<TextField fieldId='url-field' inputType='url' ref={urlFieldRef}>
						URL: 
					</TextField>

					<br/>

					<button type='submit'>Submit</button>
					<button onClick={() => toggleableFormRef.current?.toggleState()}>Cancel</button>
				</Form>
			</>
		);
	};

	return (
		<ToggleableForm buttonLabel='Submit New Blog' ref={toggleableFormRef}>
			{submitBlogForm}
		</ToggleableForm>
	);
}

export default BlogSubmitField;

