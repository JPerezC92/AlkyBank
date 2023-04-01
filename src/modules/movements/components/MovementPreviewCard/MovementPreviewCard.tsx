import { Box, ChakraComponent, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import { MovementEndpoint } from "@/movements/schemas";
import { timeAgo } from "@/shared/utils/timeAgo";

type MovementPreviewCardProps = {
	movement: MovementEndpoint;
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
				{movement.type === "TOPUP" ? (
					<Icon
						as={FaArrowUp}
						bg="success.500"
						borderRadius="full"
						fontSize="5xl"
						padding="2"
						verticalAlign="middle"
					/>
				) : (
					<Icon
						as={FaArrowDown}
						bg="danger.500"
						borderRadius="full"
						fontSize="5xl"
						padding="2"
						verticalAlign="middle"
					/>
				)}
			</Box>

			<Box>
				<>{movement.concept}</>
			</Box>

			<Box>
				<Text as="div" fontSize="xs">
					{timeAgo.format(movement.createdAt)}
				</Text>

				<Text as="b">
					{movement.amount} {movement.currency}
				</Text>
			</Box>
		</Box>
	);
};
