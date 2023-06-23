import { FormatMoney } from "@/shared/domain";

import { IMovement } from "./Movement.interface";
import { IMovementOperations } from "./MovementOperations.interface";

export class MovementPayment
	implements IMovement<"PAYMENT">, IMovementOperations
{
	id: string;
	concept: string;
	amount: number;
	operationType: "PAYMENT";
	currency: string;
	accountId: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: IMovement<"PAYMENT">) {
		this.id = props.id;
		this.amount = props.amount;
		this.concept = props.concept;
		this.currency = props.currency;
		this.operationType = "PAYMENT";
		this.accountId = props.accountId;
		this.date = props.date;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	formatAmount() {
		return FormatMoney(this.amount, this.currency);
	}

	updateValues(
		values: Pick<IMovement<"PAYMENT">, "concept" | "date">
	): MovementPayment {
		return new MovementPayment({
			...this,
			...values,
		});
	}
}
