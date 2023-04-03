import { z } from "zod";

export const ApiKnowError = z.object({
	code: z.string(),
	message: z.string(),
	statusCode: z.number(),
});

export type ApiKnowError = z.infer<typeof ApiKnowError>;
