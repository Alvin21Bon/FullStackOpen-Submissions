import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

@modelOptions({
	schemaOptions: {
		collection: 'users',
		toJSON: {
			transform: (document, object) => {
				object['id'] = document.id;
				delete object['_id'];
				delete object['__v'];
				delete object['passwordHash'];
			},
		},
	}
})
export class UserSchema
{
	@prop({
		required: true,
		unique: true,
		minlength: 3
	})
	username!: string;

	@prop({
		required: true
	})
	passwordHash!: string;

	@prop({
		required: true
	})
	name!: string;
}

export default getModelForClass(UserSchema);
