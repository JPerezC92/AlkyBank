export const MovementsQueryKeys = {
	all: ["Movements"],
	findMovements: (page = 1) =>
		[...MovementsQueryKeys.all, "findMovements", page] as const,
} as const;
