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
	@prop({
		required: true,
	}) 
	title!: string;

	@prop({
		required: true,
	}) 
	author!: string;

	@prop({
		required: true,
	}) 
	url!: string;

	@prop({
		required: true,
		default: 0
	}) 
	likes!: number;
}

const Blog = getModelForClass(BlogSchema);
export default Blog;
