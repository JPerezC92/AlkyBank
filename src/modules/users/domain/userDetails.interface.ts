import { IUser } from "@/users/domain/user.model";

export type UserDetails = {
	firstName: IUser["firstName"];
	lastName: IUser["lastName"];
	email: IUser["email"];
};
