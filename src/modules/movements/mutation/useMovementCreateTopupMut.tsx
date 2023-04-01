import { Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/auth/store";
import { MovementsRepository } from "@/movements/repos";
import {
	MovementCreateTopup,
	MovementTopupEndpoint,
} from "@/movements/schemas";
import { isApiError, toastUtility } from "@/shared/utils";

export function useMovementCreateTopupMut(
	movementsRepository: MovementsRepository
) {
	const accessToken = useAuthStore((s) => s.accessToken);

	return useMutation(
		async (movementCreateTopup: MovementCreateTopup) => {
			const movementEndpointTopup: MovementTopupEndpoint =
				await movementsRepository.create(movementCreateTopup, accessToken);

			return movementEndpointTopup;
		},
		{
			onSuccess: (data) => {
				toastUtility.success({
					title: "New Charge",
					description: (
						<Text>
							Successfully added <Text as="b">{data.amount}</Text>
						</Text>
					),
				});
			},

			onError: (e) => {
				if (!isApiError(e)) return toastUtility.errorDefault();

				toastUtility.error({
					title: "Charge Failed",
					description: e.message,
				});
			},
		}
	);
}
