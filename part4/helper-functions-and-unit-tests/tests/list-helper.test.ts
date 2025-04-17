import { test, expect, describe } from 'vitest'
import { dummy, totalLikes, mostLikes, favoriteBlog, mostBlogs } from '../utils/list-helper.ts'
import type { Blog, Author, AuthorLikes } from '../utils/list-helper.ts'

test('dummy returns one', () => {
	expect(dummy([])).toBe(1);
});

const blogs:Blog[] = [
  	{
    		title: "React patterns",
    		author: "Michael Chan",
    		url: "https://reactpatterns.com/",
    		likes: 7,
  	},
  	{
    		title: "Go To Statement Considered Harmful",
    		author: "Edsger W. Dijkstra",
    		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    		likes: 5,
  	},
  	{
    		title: "Canonical string reduction",
    		author: "Edsger W. Dijkstra",
    		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    		likes: 12,
  	},
  	{
    		title: "First class tests",
    		author: "Robert C. Martin",
    		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    		likes: 10,
  	},
  	{
    		title: "TDD harms architecture",
    		author: "Robert C. Martin",
    		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    		likes: 0,
  	},
  	{
    		title: "Type wars",
    		author: "Robert C. Martin",
    		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    		likes: 2,
  	}  
];

describe('totalLikes', () => {
	test('empty array', () => {
		expect(totalLikes([])).toBe(0);
	});

	test('single blog', () => {
		const num = Math.floor(Math.random() * 10000); 
		const blog:Blog = {
			title: "n/a",
			author: "n/a",
			url: "n/a",
			likes: num
		};

		expect(totalLikes([blog])).toBe(num);
	})

	test('multiple blogs', () => {
		expect(totalLikes(blogs)).toBe(36);
	});
});

describe('favoriteBlog', () => {
	test('empty array', () => {
		expect(favoriteBlog([])).toBeUndefined();
	});

	test('single blog', () => {
		const num = Math.floor(Math.random() * 10000); 
		const blog:Blog = {
			title: "n/a",
			author: "n/a",
			url: "n/a",
			likes: num
		};

		expect(favoriteBlog([blog])).toBe(blog);
	});

	test('multiple blogs', () => {
		expect(favoriteBlog(blogs)).toBe(blogs[2]);
	})
})

describe('mostBlogs', () => {
	test('empty array', () => {
		expect(mostBlogs([])).toBeUndefined();
	});

	test('single blog', () => {
		const blog:Blog = {
			title: "n/a",
			author: "John Doe",
			url: "n/a",
			likes: 1
		};

		expect(mostBlogs([blog])).toEqual({author: 'John Doe', blogs: 1} as Author);
	});

	test('multiple blogs different authors', () => {
		expect(mostBlogs(blogs)).toEqual({author: 'Robert C. Martin', blogs: 3} as Author);
	});

})

describe('mostLikes', () => {
	test('empty array', () => {
		expect(mostLikes([])).toBeUndefined();
	});

	test('single blog', () => {
		const blog:Blog = {
			title: "n/a",
			author: "John Doe",
			url: "n/a",
			likes: 1
		};

		expect(mostLikes([blog])).toEqual({author: 'John Doe', likes: 1} as AuthorLikes);
	});

	test('multiple blogs different authors', () => {
		expect(mostLikes(blogs)).toEqual({author: 'Edsger W. Dijkstra', likes: 17} as AuthorLikes);
	});
})
