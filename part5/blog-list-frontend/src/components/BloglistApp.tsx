import { useState } from 'react';
import Header from './Header'
import BlogsSection from './BlogsSection'

function BloglistApp()
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<header>
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

