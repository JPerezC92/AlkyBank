import { Movement, MovementType } from "@/movements/domain";
import { MovementEndpoint } from "@/movements/schemas";

export function MovementModelToEndpoint(m: Movement): MovementEndpoint {
	if (MovementType.values.TRANSFERENCE === m.operationType) {
		return {
			...m,
			type: MovementType.values.TRANSFERENCE,
		};
	}

	if (MovementType.values.PAYMENT === m.operationType) {
		return {
			...m,
			type: MovementType.values.PAYMENT,
		};
	}

	return {
		...m,
		type: MovementType.values.TOPUP,
	};
}
