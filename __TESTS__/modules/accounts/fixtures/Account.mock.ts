import * as crypto from "crypto";

import { AccountEndpoint } from "@/accounts/schemas";

export function AccountMock(): AccountEndpoint {
	return {
		id: crypto.randomUUID(),
		balance: 0,
		expense: 0,
		income: 0,
		currency: "EUR",
		userId: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}
