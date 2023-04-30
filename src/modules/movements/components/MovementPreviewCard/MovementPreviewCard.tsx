import { Box, ChakraComponent, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { Movement, MovementType } from "@/movements/domain";
import { timeAgo } from "@/shared/utils/timeAgo";

type MovementPreviewCardProps = {
	movement: Movement;
} & Parameters<ChakraComponent<"div">>[0];

export const MovementPreviewCard: React.FC<MovementPreviewCardProps> = ({
	movement,
	...props
}) => {
	return (
		<Box
			alignItems="center"
			bg="bg1"
			border="1px"
			borderColor="accent.50"
			borderRadius="md"
			display="grid"
			gap="2"
			gridTemplateColumns="auto 1fr auto"
			padding="2"
			shadow="md"
			{...props}
		>
			<Box>
				{movement.operationType === MovementType.values.TOPUP ||
				(movement.operationType === MovementType.values.TRANSFERENCE &&
					movement.isTransferenceReceived) ? (
					<Icon
						as={FaArrowUp}
						bg="success.300"
						borderRadius="full"
						fontSize="5xl"
						padding="2"
						verticalAlign="middle"
					/>
				) : (
					<Icon
						as={FaArrowDown}
						bg="danger.300"
						borderRadius="full"
						fontSize="5xl"
						padding="2"
						verticalAlign="middle"
					/>
				)}
			</Box>

			<Box>
				<Heading as="h6" size="sm" textTransform="capitalize">
					{movement.operationType}
				</Heading>
				<Text>{movement.concept}</Text>
			</Box>

			<Box textAlign="right">
				<Text as="div" fontSize="xs">
					{timeAgo.format(movement.createdAt)}
				</Text>

				<Text as="b">
					{movement.currency} {movement.amount}
				</Text>
			</Box>
		</Box>
	);
};
