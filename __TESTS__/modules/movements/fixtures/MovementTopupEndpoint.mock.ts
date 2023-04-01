import * as crypto from "crypto";

import { MovementTopupEndpoint } from "@/movements/schemas";

export function MovementTopupEndpointMock(): MovementTopupEndpoint {
	return {
		id: crypto.randomUUID(),
		amount: 100,
		currency: "ARS",
		date: new Date(),
		concept: "Concept test",
		accountId: "1",
		createdAt: new Date(),
		updatedAt: new Date(),
		type: "TOPUP",
	};
}
