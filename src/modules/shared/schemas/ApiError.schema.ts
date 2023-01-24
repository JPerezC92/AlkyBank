import { z } from 'zod';

export const ApiError = z.object({
	statusCode: z.number(),
	message: z.string(),
	code: z.string(),
});

export type ApiError = z.infer<typeof ApiError>;
