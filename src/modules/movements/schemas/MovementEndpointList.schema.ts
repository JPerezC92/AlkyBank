import { z } from "zod";

import { PaginationEndpoint } from "@/shared/schemas";

import { MovementEndpoint } from "./MovementEndpoint.schema";

export const MovementGETResponse = z.object({
	movementList: z.array(MovementEndpoint),
	pagination: PaginationEndpoint,
});

export type MovementGETResponse = z.infer<typeof MovementGETResponse>;
