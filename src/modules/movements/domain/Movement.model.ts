import { IMovement } from "@/movements/domain/Movement.interface";
import {
	ITransference,
	MovementTopup,
} from "@/movements/domain/Movement.topup.model";
import { MovementTransference } from "@/movements/domain/Movement.transference.model";

import { MovementPayment } from "./Movement.payment.model";

export type Movement = MovementTransference | MovementTopup | MovementPayment;

export function Movement(movement: ITransference): MovementTransference;
export function Movement(movement: IMovement<"TOPUP">): MovementTopup;
export function Movement(movement: IMovement<"PAYMENT">): MovementPayment;
export function Movement(
	movement: IMovement<"TOPUP"> | ITransference | IMovement<"PAYMENT">
): Movement {
	if (movement.operationType === "TRANSFERENCE") {
		return new MovementTransference(movement);
	}

	if (movement.operationType === "PAYMENT") {
		return new MovementPayment(movement);
	}

	return new MovementTopup(movement);
}
