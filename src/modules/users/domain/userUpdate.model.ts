import { User } from "./user.model";

export type UserUpdate = Pick<User, "firstName" | "lastName" | "email"> & {
	confirmEmail: string;
};
