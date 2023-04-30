import { MovementType } from "@/movements/domain/MovementType.enum";
import { EnumType, EnumTypeInfer } from "@/shared/domain";

export const MovementFilterTypeEnum = EnumType("ALL", ...MovementType.iterable);

export type MovementFilterTypeEnum = EnumTypeInfer<
	typeof MovementFilterTypeEnum
>;
