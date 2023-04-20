import { User } from "@/users/domain/user.model";

export type UserDetails = {
	firstName: User["firstName"];
	lastName: User["lastName"];
	email: User["email"];
};
