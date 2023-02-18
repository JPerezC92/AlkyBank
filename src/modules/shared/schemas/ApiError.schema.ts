import { z } from "zod";

export const ApiError = z.object({
	code: z.string(),
	message: z.string(),
	statusCode: z.number(),
});

export type ApiError = z.infer<typeof ApiError>;
