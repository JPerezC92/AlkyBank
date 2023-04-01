import * as crypto from "crypto";

import { MovementTransferenceEndpoint } from "@/movements/schemas";

export function MovementTransferenceEndpointMock(): MovementTransferenceEndpoint {
	return {
		id: crypto.randomUUID(),
		amount: 100,
		currency: "ARS",
		date: new Date(),
		concept: "Concept test",
		accountId: "1",
		createdAt: new Date(),
		updatedAt: new Date(),
		type: "TRANSFERENCE",
		toAccountId: "2",
	};
}
