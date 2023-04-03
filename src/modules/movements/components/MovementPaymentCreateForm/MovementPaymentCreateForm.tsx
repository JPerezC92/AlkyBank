import { ChakraComponent, Heading } from "@chakra-ui/react";
import React from "react";

import {
	MovementForm,
	MovementFormWrapper,
} from "@/movements/components/MovementForm";
import { MovementType } from "@/movements/domain";
import { useMovementCreateMut } from "@/movements/mutation";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";

type MovementPaymentCreateFormProps = {
	movementsRepository?: MovementsRepository;
} & Parameters<ChakraComponent<"div">>[0];

export const MovementPaymentCreateForm: React.FC<
	MovementPaymentCreateFormProps
> = ({ movementsRepository = MovementsNestJSRepository(), ...props }) => {
	const movementCreateMut = useMovementCreateMut(movementsRepository);

	return (
		<MovementFormWrapper {...props}>
			<Heading as="h2" textAlign="center" size="xl" position="relative">
				Payment Details
			</Heading>

			<MovementForm
				isLoading={movementCreateMut.isLoading}
				onSubmit={(values) => {
					movementCreateMut.mutate({
						...values,
						type: MovementType.PAYMENT,
					});
				}}
			/>
		</MovementFormWrapper>
	);
};
