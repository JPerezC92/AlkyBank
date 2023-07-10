import { MyRepo } from "@/shared/repos";
import { User } from "@/users/domain";

import { AuthRepository } from "./auth.repository";

const userStub1 = new User({
	id: "1",
	accountList: [],
	email: "jhon@gmail.com",
	firstName: "Jhon",
	lastName: "Doe",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

export const AuthStubRepository: MyRepo<AuthRepository> = () => {
	return {
		login: async () => {
			return "accessToken";
		},

		userInfo: async () => {
			return userStub1;
		},

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		changePassword: async () => {},

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		logout: async () => {},

		refreshToken: async () => {
			return "accessToken2";
		},
	};
};
