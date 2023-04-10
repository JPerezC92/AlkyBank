import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

type AccountBalanceCardProps = {
	image: React.ReactElement;
	title: string;
	amount: string;
};

export const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({
	amount,
	image,
	title,
}) => {
	return (
		<Box
			minW={{ base: "md", lg: "auto" }}
			maxW={{ base: "md", lg: "auto" }}
			position="relative"
			shadow="md"
			borderWidth="1px"
			borderColor="primary.100"
			borderRadius="base"
			_before={{
				borderRadius: "inherit",
				bg: "bg1",
				inset: "0",
				position: "absolute",
				content: '""',
				opacity: "0.6",
				zIndex: "-1",
			}}
		>
			<>
				{image}

				<Box px="4" py="2" borderBlockStart="1px" borderColor="primary.100">
					<Heading as="h2" mb="1" color="secondary.600">
						{title}
					</Heading>

					<Text fontWeight="semibold" textAlign="right" fontSize="xl">
						{amount}
					</Text>
				</Box>
			</>
		</Box>
	);
};
