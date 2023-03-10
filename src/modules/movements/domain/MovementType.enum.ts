export const MovementTypeEnum = ["TOPUP", "PAYMENT", "TRANSFERENCE"] as const;
export type MovementTypeEnum = (typeof MovementTypeEnum)[number];

export const MovementType = MovementTypeEnum.reduce(
	(a, b) => ({ ...a, [b]: b }),
	{} as { [key in (typeof MovementTypeEnum)[number]]: key }
);
