import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'

@modelOptions({
	schemaOptions: {
		collection: 'userInfo',
		toJSON: {
			transform: (document, object) => {
				object['id'] = document.id;
				delete object['_id'];
				delete object['__v'];
			},
		},
	}
})
class UserInfoSchema
{
	@prop({
		required: true
	})
	name!: string;
}

const UserInfo = getModelForClass(UserInfoSchema);
export default UserInfo;
