import { FormatMoney } from "@/shared/domain";

import { ITransference } from "./Movement.topup.model";
import { IMovementOperations } from "./MovementOperations.interface";

export class MovementTransference
	implements ITransference, IMovementOperations
{
	toAccountId: string;
	id: string;
	concept: string;
	amount: number;
	operationType: "TRANSFERENCE";
	currency: string;
	accountId: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
	isTransferenceReceived: boolean;

	constructor(props: ITransference) {
		this.id = props.id;
		this.concept = props.concept;
		this.amount = props.amount;
		this.operationType = props.operationType;
		this.currency = props.currency;
		this.accountId = props.accountId;
		this.toAccountId = props.toAccountId;
		this.date = props.date;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
		this.isTransferenceReceived = props.isTransferenceReceived;
	}

	formatAmount() {
		return FormatMoney(this.amount, this.currency);
	}

	isTransferenceSent(accountList: string[]) {
		return !accountList.includes(this.accountId);
	}
}
