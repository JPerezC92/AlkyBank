import { Box } from "@chakra-ui/react";

export const PrivateContainer: typeof Box = (props) => {
	return (
		<Box
			w="full"
			maxW="container.xl"
			mx="auto"
			py="10"
			paddingX={{ base: "4", xl: 0 }}
			{...props}
		/>
	);
};
