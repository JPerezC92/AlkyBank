import { z } from "zod";

import { MovementType } from "@/movements/domain";

const MovementEndpointBase = z.object({
	id: z.string().uuid(),
	amount: z.number(),
	currency: z.string(),
	date: z
		.string()
		.datetime()
		.transform((date) => new Date(date)),
	concept: z.string(),
	accountId: z.string().uuid(),
	createdAt: z
		.string()
		.datetime()
		.transform((date) => new Date(date)),
	updatedAt: z
		.string()
		.datetime()
		.transform((date) => new Date(date)),
});

export const MovementEndpoint = z.discriminatedUnion("type", [
	z
		.object({
			type: z.literal(MovementType.values.TOPUP),
		})
		.merge(MovementEndpointBase),
	z
		.object({
			type: z.literal(MovementType.values.PAYMENT),
		})
		.merge(MovementEndpointBase),
	z
		.object({
			type: z.literal(MovementType.values.TRANSFERENCE),
			isTransferenceReceived: z.boolean(),
			toAccountId: z.string().uuid(),
		})
		.merge(MovementEndpointBase),
]);

export type MovementEndpoint = z.infer<typeof MovementEndpoint>;

export type MovementTopupEndpoint = Extract<
	MovementEndpoint,
	{ type: "TOPUP" }
>;

export type MovementPaymentEndpoint = Extract<
	MovementEndpoint,
	{ type: "PAYMENT" }
>;

export type MovementTransferenceEndpoint = Extract<
	MovementEndpoint,
	{ type: "TRANSFERENCE" }
>;
