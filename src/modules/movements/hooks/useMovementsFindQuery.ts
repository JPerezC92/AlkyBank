import { useQuery } from "@tanstack/react-query";

import { useAccountStore } from "@/accounts/store";
import { useAuthStore } from "@/auth/store";
import { MovementsQueryKeys } from "@/movements/domain";
import { MovementsRepository } from "@/movements/repos";
import { IPaginationCriteria } from "@/shared/domain";
import { isApiError, toastUtility } from "@/shared/utils";

export function useMovementsFindQuery(
	movementsRepository: MovementsRepository,
	page: IPaginationCriteria["page"] = 1,
	limit: IPaginationCriteria["limit"] = 10
) {
	const accountActive = useAccountStore((s) => s.accountActive);
	const accessToken = useAuthStore((s) => s.accessToken);

	return useQuery(
		MovementsQueryKeys.findMovements(),
		async ({ signal }) => {
			if (!accountActive) return;

			return await movementsRepository.findAll(
				accountActive.id,
				accessToken,
				{ page, limit },
				signal
			);
		},
		{
			enabled: !!accountActive,
			onError: (err) => {
				if (!isApiError(err)) return toastUtility.errorDefault();

				toastUtility.error({
					description: err.message,
				});
			},
		}
	);
}
