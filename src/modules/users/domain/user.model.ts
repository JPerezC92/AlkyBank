import { Account } from "@/accounts/domain";

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	id: string;
	updatedAt: string;
	createdAt: string;
	accountList: Account[];
}
