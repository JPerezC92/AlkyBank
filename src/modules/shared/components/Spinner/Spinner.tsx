import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

import { useAuthStore } from "@/auth/store";
import { useSpinnerStore } from "@/shared/store";

export const SpinnerGlobal: React.FC = () => {
	const isActive = useSpinnerStore((s) => s.isLoading);
	const user = useAuthStore((s) => s.user);

	if (!isActive) return null;

	return (
		<>
			<Box
				position="fixed"
				width="full"
				height="full"
				maxWidth="100vw"
				maxHeight="100vh"
				display="flex"
				pointerEvents="none"
				_before={{
					width: "100%",
					height: "100%",
					opacity: !user ? "1" : "0.2",
					position: "absolute",
					bgColor: !user ? "bg1" : "primary.800",
					content: '""',
				}}
			>
				<Spinner margin="auto" position="relative" />
			</Box>
		</>
	);
};
