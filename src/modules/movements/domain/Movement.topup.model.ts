import { FormatMoney } from "@/shared/domain";

import { IMovement } from "./Movement.interface";
import { IMovementOperations } from "./MovementOperations.interface";

export class MovementTopup implements IMovement<"TOPUP">, IMovementOperations {
	id: string;
	amount: number;
	operationType: "TOPUP";
	concept: string;
	currency: string;
	accountId: string;
	date: Date;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: IMovement<"TOPUP">) {
		this.id = props.id;
		this.amount = props.amount;
		this.concept = props.concept;
		this.currency = props.currency;
		this.operationType = "TOPUP";
		this.accountId = props.accountId;
		this.date = props.date;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	formatAmount() {
		return FormatMoney(this.amount, this.currency);
	}

	updateValues(
		values: Pick<IMovement<"TOPUP">, "concept" | "date">
	): MovementTopup {
		return new MovementTopup({
			...this,
			...values,
		});
	}
}
