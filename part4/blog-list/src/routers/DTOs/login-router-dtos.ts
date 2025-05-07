import type { ObjectId } from "mongoose"

export interface LoginDTO {
	username: string,
	password: string
};

export interface JWTPayloadDTO {
	id: ObjectId;
};

export interface LoginResponseDTO {
	token: string;
	username: string;
	name: string;
};

