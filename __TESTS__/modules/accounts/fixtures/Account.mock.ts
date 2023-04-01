import * as crypto from "crypto";

import { AccountEndpoint } from "@/accounts/schemas";

export function AccountMock(): AccountEndpoint {
	return {
		id: crypto.randomUUID(),
		money: 100,
		currency: "EUR",
		userId: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}
