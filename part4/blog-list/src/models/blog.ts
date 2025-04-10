import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

@modelOptions({
	schemaOptions: {
		collection: 'blogs',
		toJSON: {
			transform: (document, object) => {
				object['id'] = document.id;
				delete object['_id'];
				delete object['__v'];
			},
		},
	}
})
class BlogSchema
{
	@prop() title!: string;
	@prop() author!: string;
	@prop() url!: string;
	@prop() likes!: number;
}

const Blog = getModelForClass(BlogSchema);
export default Blog;
