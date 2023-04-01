import { Box, ChakraComponent, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";

type InfoBoxProps = { message: string } & Parameters<ChakraComponent<"div">>[0];

export const InfoBox: React.FC<InfoBoxProps> = ({ message, ...props }) => {
	return (
		<Box
			bg="info.50"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			borderRadius="md"
			borderWidth="1px"
			borderColor="info.100"
			{...props}
		>
			<Icon as={AiFillInfoCircle} color="info.500" fontSize="6xl" />

			<Text>{message}</Text>
		</Box>
	);
};
