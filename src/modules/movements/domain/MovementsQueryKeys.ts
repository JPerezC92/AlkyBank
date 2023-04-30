import { IMovementCriteria, IPaginationCriteria } from "@/shared/domain";

export const MovementsQueryKeys = {
	all: ["Movements"] as const,
	findMovements: (
		{ page, limit }: IPaginationCriteria,
		{ accountId, operationType, concept }: Partial<IMovementCriteria>
	) =>
		[
			...MovementsQueryKeys.all,
			"findMovements",
			accountId,
			operationType,
			concept,
			page,
			limit,
		] as const,
} as const;
