import { Account } from "@/accounts/domain";
import { currencyDefault } from "@/currencies/domain";

export interface IUser {
	fullName: string;
	firstName: string;
	lastName: string;
	nameInitials: string;
	email: string;
	id: string;
	updatedAt: string;
	createdAt: string;
	accountList: Account[];
}
export type IUserProps = Omit<IUser, "nameInitials" | "fullName">;

export class User implements IUser {
	fullName: string;
	nameInitials: string;
	firstName: string;
	lastName: string;
	email: string;
	id: string;
	updatedAt: string;
	createdAt: string;
	accountList: Account[];

	constructor(props: IUserProps) {
		this.fullName = `${props.firstName} ${props.lastName}`;
		this.nameInitials = `${props.firstName[0]}${props.lastName[0]}`;
		this.firstName = props.firstName;
		this.lastName = props.lastName;
		this.email = props.email;
		this.id = props.id;
		this.updatedAt = props.updatedAt;
		this.createdAt = props.createdAt;
		this.accountList = props.accountList;
	}

	getDefaultAccount(): Account {
		return this.accountList.find(
			(account) => account.currency === currencyDefault
		) as Account;
	}
}
