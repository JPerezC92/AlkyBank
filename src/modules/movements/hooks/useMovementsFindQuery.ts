import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/auth/store";
import { MovementsQueryKeys } from "@/movements/domain";
import { MovementsRepository } from "@/movements/repos";
import { IMovementCriteria, IPaginationCriteria } from "@/shared/domain";
import { isApiError, toastUtility } from "@/shared/utils";

export function useMovementsFindQuery(
	movementsRepository: MovementsRepository,
	page: IPaginationCriteria["page"] = 1,
	limit: IPaginationCriteria["limit"] = 10,
	accountId?: IMovementCriteria["accountId"],
	operationType?: IMovementCriteria["operationType"],
	concept?: IMovementCriteria["concept"]
) {
	const accessToken = useAuthStore((s) => s.accessToken);

	return useQuery(
		MovementsQueryKeys.findMovements(
			{ page, limit },
			{ accountId, operationType, concept }
		),
		async ({ signal }) => {
			if (!accountId || !operationType) return;

			return await movementsRepository.findAll(
				accessToken,
				{ page, limit },
				{
					accountId,
					operationType,
					concept,
				},
				signal
			);
		},
		{
			enabled: !!accessToken && !!accountId && !!operationType,
			keepPreviousData: true,
			onError: (err) => {
				if (!isApiError(err)) return toastUtility.errorDefault();

				toastUtility.error({
					description: err.message,
				});
			},
		}
	);
}
