import { Divider, HStack, Text } from "@chakra-ui/react";
import React from "react";

export const FormButtonDivider: React.FC = () => {
	return (
		<HStack>
			<Divider width="full" borderColor="primary.500" />
			<Text>or</Text>
			<Divider width="full" borderColor="primary.500" />
		</HStack>
	);
};
