import { Box, Button, chakra, Heading } from "@chakra-ui/react";
import React from "react";

import { useAuthStore } from "@/auth/store";
import { currencyDefault } from "@/currencies/domain";
import { useMovementCreateMut } from "@/movements/mutation";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";

type QuickChargeProps = {
	movementsRepository?: MovementsRepository;
	quickChargeList: number[];
};

export const QuickCharge: React.FC<QuickChargeProps> = ({
	movementsRepository = MovementsNestJSRepository(),
	quickChargeList,
}) => {
	const user =
		useAuthStore((s) => s.user)?.accountList.find(
			(a) => a.currency === currencyDefault
		)?.id || "";

	const movementCreateTopupMut = useMovementCreateMut(movementsRepository);

	return (
		<Box
			as="fieldset"
			borderColor="primary.400"
			borderRadius="base"
			borderWidth="1px"
			boxShadow="lg"
			display="grid"
			gap="2"
			maxW={{ md: "md" }}
			p="4"
			gridTemplateColumns={{
				base: "repeat(auto-fit,minmax(min(50%,10rem),1fr))",
				md: "repeat(auto-fit,minmax(min(50%,6rem),1fr))",
			}}
		>
			<chakra.legend px="2">
				<Heading as="span" size="sm">
					Quick Charge
				</Heading>
			</chakra.legend>

			{quickChargeList.map((value) => (
				<Button
					key={value}
					variant="solid"
					colorScheme="secondary"
					onClick={() =>
						movementCreateTopupMut.mutate({
							type: "TOPUP",
							date: new Date(),
							amount: value,
							concept: "Quick charge",
							accountId: user,
						})
					}
				>
					{value} {currencyDefault}
				</Button>
			))}
		</Box>
	);
};
