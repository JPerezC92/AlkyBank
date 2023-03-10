import { z } from "zod";

export const AccountEndpoint = z.object({
	id: z.string().uuid(),
	money: z.number().min(0),
	userId: z.string().uuid(),
	currency: z.string(),
	createdAt: z
		.string()
		.datetime()
		.transform((v) => new Date(v)),
	updatedAt: z
		.string()
		.datetime()
		.transform((v) => new Date(v)),
});

export type AccountEndpoint = z.infer<typeof AccountEndpoint>;
