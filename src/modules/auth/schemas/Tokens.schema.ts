import z from "zod";

export const Tokens = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

export type Tokens = z.infer<typeof Tokens>;
