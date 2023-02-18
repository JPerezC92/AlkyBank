import { Box } from "@chakra-ui/react";
import React from "react";

import { BackgroundWaves } from "@/shared/components/BackgroundWaves";
import { Navigation } from "@/shared/components/Navigation";

type AppLayoutProps = {
	children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return (
		<Box>
			<BackgroundWaves />
			<Navigation />

			{children}
		</Box>
	);
};
