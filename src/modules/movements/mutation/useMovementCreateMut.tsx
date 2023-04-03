import { Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/auth/store";
import { MovementType } from "@/movements/domain";
import { MovementsRepository } from "@/movements/repos";
import { MovementCreate } from "@/movements/schemas";
import { isApiError, toastUtility } from "@/shared/utils";

export function useMovementCreateMut(movementsRepository: MovementsRepository) {
	const accessToken = useAuthStore((s) => s.accessToken);

	return useMutation(
		async (movementCreateTopup: MovementCreate) => {
			const movement = await movementsRepository.create(
				movementCreateTopup,
				accessToken
			);

			return movement;
		},
		{
			onSuccess: (data) => {
				if (data.type === MovementType.TOPUP) {
					return toastUtility.success({
						title: "New Charge",
						description: (
							<Text>
								Amount{" "}
								<Text as="b">
									{data.currency} {data.amount}
								</Text>
							</Text>
						),
					});
				}

				if (data.type === MovementType.PAYMENT) {
					return toastUtility.success({
						title: "New Payment",
						description: (
							<Text>
								Amount{" "}
								<Text as="b">
									{data.currency} {data.amount}
								</Text>
							</Text>
						),
					});
				}

				return toastUtility.success({
					title: "New Transference",
					description: (
						<Text>
							Amount{" "}
							<Text as="b">
								{data.currency} {data.amount}
							</Text>
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
