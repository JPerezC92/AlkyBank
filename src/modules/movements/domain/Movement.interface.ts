import { Account } from "@/accounts/domain";

import { MovementType } from "./MovementType.enum";

export interface IMovement<OperationType extends MovementType> {
	id: string;
	concept: string;
	amount: number;
	operationType: OperationType;
	currency: string;
	accountId: Account["id"];
	date: Date;
	createdAt: Date;
	updatedAt: Date;
}
