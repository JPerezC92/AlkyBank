import { UserEndpoint } from "@/users/schemas";

export const userStub1: UserEndpoint = {
	id: "1",
	lastName: "Doe",
	email: "jhon@gmail.com",
	accountList: [],
	firstName: "John",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
