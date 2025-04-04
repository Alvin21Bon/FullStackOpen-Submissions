import { Mongoose } from '../utils/mongoose.js'

const blogSchema = Mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});

blogSchema.set('toJSON', {
	transform: (document, object) => {
		object.id = document.id;
		delete object._id;
		delete object.__v;
	}
});

const Blog = Mongoose.model('blogs', blogSchema);
export default Blog;
