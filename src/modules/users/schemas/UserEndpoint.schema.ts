import { z } from "zod";

import { AccountEndpoint } from "@/accounts/schemas";

import { UserDetailsEndpoint } from "./UserDetailsEndpoint";

export const UserEndpoint = UserDetailsEndpoint.merge(
	z.object({
		id: z.string().uuid(),
		updatedAt: z.string().datetime(),
		createdAt: z.string().datetime(),
		accountList: z.array(AccountEndpoint),
	})
);

export type UserEndpoint = z.infer<typeof UserEndpoint>;
