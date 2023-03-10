import { z } from "zod";

import { MovementType } from "@/movements/domain";

const MovementBase = z.object({
	amount: z.number(),
	date: z.date(),
	concept: z.string(),
	accountId: z.string().uuid(),
});

export const MovementCreate = z.discriminatedUnion("type", [
	z
		.object({
			type: z.literal(MovementType.TOPUP),
		})
		.merge(MovementBase),
	z
		.object({
			type: z.literal(MovementType.PAYMENT),
		})
		.merge(MovementBase),
	z
		.object({
			type: z.literal(MovementType.TRANSFERENCE),
			toAccountId: z.string().uuid(),
		})
		.merge(MovementBase),
]);

export type MovementCreate = z.infer<typeof MovementCreate>;

export type MovementCreateTopup = Extract<MovementCreate, { type: "TOPUP" }>;

export type MovementCreatePayment = Extract<
	MovementCreate,
	{ type: "PAYMENT" }
>;

export type MovementCreateTransference = Extract<
	MovementCreate,
	{ type: "TRANSFERENCE" }
>;
