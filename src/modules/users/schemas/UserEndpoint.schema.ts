import { z } from "zod";

export const User = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	id: z.string().uuid(),
	updatedAt: z.string().datetime(),
	createdAt: z.string().datetime(),
});

export type User = z.infer<typeof User>;
