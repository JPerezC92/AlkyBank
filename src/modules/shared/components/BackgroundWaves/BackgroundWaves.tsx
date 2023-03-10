import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const BackgroundStyled = styled(Image)({ objectFit: "cover", opacity: "0.1" });

export const BackgroundWaves: React.FC = () => {
	return (
		<Box position="fixed" w="full" h="full" zIndex="-1" top="0">
			<BackgroundStyled src="/bg1.svg" alt="background" fill priority />
		</Box>
	);
};
