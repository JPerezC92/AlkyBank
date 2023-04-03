import { ChakraComponent, Heading } from "@chakra-ui/react";
import React from "react";

import { MovementForm, MovementFormWrapper } from "@/movements/components";
import { useMovementCreateMut } from "@/movements/mutation";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";

type MovementTopupCreateFormProps = {
	movementsRepository?: MovementsRepository;
} & Parameters<ChakraComponent<"div">>[0];

export const MovementTopupCreateForm: React.FC<
	MovementTopupCreateFormProps
> = ({ movementsRepository = MovementsNestJSRepository(), ...props }) => {
	const movementCreateMut = useMovementCreateMut(movementsRepository);

	return (
		<MovementFormWrapper {...props}>
			<Heading as="h2" textAlign="center" size="xl" position="relative">
				Custom Charge
			</Heading>

			<MovementForm
				onSubmit={(values) => {
					movementCreateMut.mutate({
						...values,
						type: "TOPUP",
					});
				}}
			/>
		</MovementFormWrapper>
	);
};
