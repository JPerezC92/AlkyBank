import { Movement, MovementType } from "@/movements/domain";
import { MovementEndpoint } from "@/movements/schemas";

export function MovementEndpointToModel(m: MovementEndpoint) {
	if (MovementType.values.TRANSFERENCE === m.type) {
		return Movement({
			...m,
			operationType: MovementType.values.TRANSFERENCE,
		});
	}

	if (MovementType.values.PAYMENT === m.type) {
		return Movement({
			...m,
			operationType: MovementType.values.PAYMENT,
		});
	}

	return Movement({
		...m,
		operationType: MovementType.values.TOPUP,
	});
}
