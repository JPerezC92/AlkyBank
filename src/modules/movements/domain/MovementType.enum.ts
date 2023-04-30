import { EnumType, EnumTypeInfer } from "@/shared/domain";

export const MovementType = EnumType("TOPUP", "PAYMENT", "TRANSFERENCE");

// export const MovementType = _MovementType.values;
export type MovementType = EnumTypeInfer<typeof MovementType>;
