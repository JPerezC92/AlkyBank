import { z } from "zod";

export const PaginationEndpoint = z.object({
	page: z.number(),
	totalPages: z.number(),
	prevPage: z.number().nullable(),
	nextPage: z.number().nullable(),
});

export type PaginationEndpoint = z.infer<typeof PaginationEndpoint>;
