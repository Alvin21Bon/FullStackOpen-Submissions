export interface Blog {
	title: string,
	author: string,
	url: string,
	likes: number
};

export const dummy = (blogs: Blog[]) => {
	return 1;
}

export const totalLikes = (blogs: Blog[]) => {
	let totalLikes = 0;
	for (let blog of blogs) totalLikes += blog.likes;

	return totalLikes;
}

export const favoriteBlog = (blogs: Blog[]) => {
	let favoriteBlog:Blog|undefined;
	for (let blog of blogs)
	{
		if (!favoriteBlog || blog.likes > favoriteBlog.likes) favoriteBlog = blog;
	}

	return favoriteBlog; 
}

export interface Author {
	author: string,
	blogs: number
}
export const mostBlogs = (blogs: Blog[]): Author|undefined => {
	let authors:Author[] = [];

	for (let blog of blogs)
	{
		const authorInArray = authors.find(author => author.author === blog.author);
		if (!authorInArray) {
			authors.push({author: blog.author, blogs: 1});
			continue;
		}

		authorInArray.blogs++;
	}

	let authorWithMostBlogs:Author|undefined;
	for (let author of authors)
	{
		if (!authorWithMostBlogs || author.blogs > authorWithMostBlogs.blogs) authorWithMostBlogs = author;
	}

	return authorWithMostBlogs;
}

export interface AuthorLikes {
	author: string,
	likes: number
};
export const mostLikes = (blogs: Blog[]):AuthorLikes|undefined => {
	let authors:AuthorLikes[] = [];

	for (let blog of blogs)
	{
		const authorInArray = authors.find(author => author.author === blog.author);
		if (!authorInArray) {
			authors.push({author: blog.author, likes: blog.likes});
			continue;
		}

		authorInArray.likes += blog.likes;
	}

	let authorWithMostLikes:AuthorLikes|undefined;
	for (let author of authors)
	{
		if (!authorWithMostLikes || author.likes > authorWithMostLikes.likes) authorWithMostLikes = author;
	}

	return authorWithMostLikes;
}
