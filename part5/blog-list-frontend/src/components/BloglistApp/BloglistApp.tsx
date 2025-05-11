import './BloglistApp.css'

import { useState } from 'react';
import Header from '../Header/Header'
import BlogsSection from '../BlogsSection/BlogsSection'

function BloglistApp()
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<header className="webpage-header">
				<Header 
					isLoggedIn={isLoggedIn}
					setIsLoggedIn={setIsLoggedIn}
				/>
			</header>
			<main>
				<BlogsSection
					isLoggedIn={isLoggedIn}
				/>
			</main>
		</>
	)
}

export default BloglistApp;

