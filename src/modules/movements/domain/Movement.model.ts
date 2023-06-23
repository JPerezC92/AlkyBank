import { IMovement } from "./Movement.interface";
import { MovementPayment } from "./Movement.payment.model";
import { MovementTopup } from "./Movement.topup.model";
import {
	ITransference,
	MovementTransference,
} from "./Movement.transference.model";

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
