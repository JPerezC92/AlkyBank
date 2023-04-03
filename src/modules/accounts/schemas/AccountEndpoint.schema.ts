import { z } from "zod";

export const AccountEndpoint = z.object({
	id: z.string().uuid(),
	balance: z.number().min(0),
	income: z.number().min(0),
	expense: z.number().min(0),
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
