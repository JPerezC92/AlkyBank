import { Box } from "@chakra-ui/react";
import React from "react";

import { BackgroundWaves } from "@/shared/components/BackgroundWaves";
import { Footer } from "@/shared/components/Footer";
import { Navigation } from "@/shared/components/Navigation";

type AppLayoutProps = {
	children: React.ReactNode;
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return (
		<Box display="grid" gridTemplateRows="auto 1fr auto" minH="full">
			<BackgroundWaves />
			<Navigation />

			{children}

			<Footer />
		</Box>
	);
};
