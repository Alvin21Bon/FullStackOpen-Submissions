import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'
import type { ObjectId } from 'mongoose'

@modelOptions({
	schemaOptions: {
		collection: 'userCreds',
	}
})
class UserCredsSchema
{
	@prop({
		required: true,
		unique: true
	})
	username!: string;

	@prop({
		required: true
	})
	passwordHash!: string;

	@prop({
		required: true,
		unique: true
	})
	userInfoId!: ObjectId
}

const UserCreds = getModelForClass(UserCredsSchema);
export default UserCreds;
