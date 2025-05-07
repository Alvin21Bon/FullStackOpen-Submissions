import { useState } from 'react';
import Header from './Header'
import BlogsSection from './BlogsSection'

function BloglistApp()
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<Header 
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
			/>
			<BlogsSection
				isLoggedIn={isLoggedIn}
			/>
		</>
	)
}

export default BloglistApp;

