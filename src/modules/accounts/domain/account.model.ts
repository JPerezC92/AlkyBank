import { FormatMoney } from "@/shared/domain";

export interface AccountProps {
	id: string;
	updatedAt: Date;
	createdAt: Date;
	balance: number;
	income: number;
	expense: number;
	userId: string;
	currency: string;
}

export class Account implements AccountProps {
	id: string;
	updatedAt: Date;
	createdAt: Date;
	balance: number;
	income: number;
	expense: number;
	userId: string;
	currency: string;

	constructor(props: AccountProps) {
		this.id = props.id;
		this.updatedAt = props.updatedAt;
		this.createdAt = props.createdAt;
		this.balance = props.balance;
		this.income = props.income;
		this.expense = props.expense;
		this.userId = props.userId;
		this.currency = props.currency;
	}

	formatBalance() {
		return FormatMoney(this.balance, this.currency);
	}

	formatIncome() {
		return FormatMoney(this.income, this.currency);
	}

	formatExpense() {
		return FormatMoney(this.expense, this.currency);
	}
}
