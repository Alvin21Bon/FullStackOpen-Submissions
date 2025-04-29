import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

import type { DocumentType } from '@typegoose/typegoose'

const commonTransform = (document:any, object:any) => {
	object['id'] = document.id;
	delete object['_id'];
	delete object['__v'];
	delete object['passwordHash'];
};

@modelOptions({
	schemaOptions: {
		collection: 'users',
		toJSON: {
			transform: commonTransform,
		},
		toObject: {
			transform: commonTransform,
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
