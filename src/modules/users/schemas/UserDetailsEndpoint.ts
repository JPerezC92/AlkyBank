import { z } from "zod";

export const UserDetailsEndpoint = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
});
