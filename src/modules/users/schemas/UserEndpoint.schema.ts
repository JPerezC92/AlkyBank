import { z } from "zod";

import { AccountEndpoint } from "@/accounts/schemas";

export const UserEndpoint = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	id: z.string().uuid(),
	updatedAt: z.string().datetime(),
	createdAt: z.string().datetime(),
	accountList: z.array(AccountEndpoint),
});

export type UserEndpoint = z.infer<typeof UserEndpoint>;
