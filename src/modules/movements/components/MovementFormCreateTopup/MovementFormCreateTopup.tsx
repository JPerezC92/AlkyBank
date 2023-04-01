import { Box, ChakraComponent, Heading } from "@chakra-ui/react";
import React from "react";

import { MovementForm } from "@/movements/components";
import { useMovementCreateTopupMut } from "@/movements/mutation";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";

type MovementFormCreateTopupProps = {
	movementsRepository?: MovementsRepository;
} & Parameters<ChakraComponent<"div">>[0];

export const MovementFormCreateTopup: React.FC<
	MovementFormCreateTopupProps
> = ({ movementsRepository = MovementsNestJSRepository(), ...props }) => {
	const movementCreateTopupMut = useMovementCreateTopupMut(movementsRepository);

	return (
		<Box
			backdropFilter="blur(4px)"
			border="1px"
			borderColor="primary.300"
			borderRadius="base"
			boxShadow="2xl"
			display="flex"
			flexDirection="column"
			gap="5"
			maxW={{ md: "sm" }}
			padding="4"
			shadow="2xl"
			width="full"
			_before={{
				borderRadius: "inherit",
				bg: "bg1",
				inset: "0",
				position: "absolute",
				content: '""',
				opacity: "0.6",
			}}
			{...props}
		>
			<Heading as="h2" textAlign="center" size="xl" position="relative">
				Custom Charge
			</Heading>

			<MovementForm
				display="contents"
				onSubmit={(values) =>
					movementCreateTopupMut.mutate({
						...values,
						type: "TOPUP",
						amount: parseInt(values.amount),
						date: new Date(values.date),
					})
				}
			/>
		</Box>
	);
};
