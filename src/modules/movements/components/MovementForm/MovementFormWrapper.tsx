import { Box, ChakraComponent } from "@chakra-ui/react";

type Props = Parameters<ChakraComponent<"div">>[0];

export const MovementFormWrapper = ({ ...props }: Props) => {
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
				zIndex: "0",
				bg: "bg1",
				inset: "0",
				position: "absolute",
				content: '""',
				opacity: "0.6",
			}}
			{...props}
		/>
	);
};
