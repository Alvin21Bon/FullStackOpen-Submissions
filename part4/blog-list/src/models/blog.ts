import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'
import { UserSchema } from './user.js'

import type { Ref } from '@typegoose/typegoose'

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
export class BlogSchema
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

	@prop({
		required: true,
		ref: () => UserSchema
	})
	user!: Ref<UserSchema>;
}

export default getModelForClass(BlogSchema);
