import type { ReactNode } from 'react'

interface BlogEntryInfoRowProps {
	children: ReactNode;
}

function BlogEntryInfoRow({children}: BlogEntryInfoRowProps)
{
	return (
		<li>
			{children}
		</li>
	);
}

export default BlogEntryInfoRow;

