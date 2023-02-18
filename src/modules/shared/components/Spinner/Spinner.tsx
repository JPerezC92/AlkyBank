import React from "react";

import { useSpinnerStore } from "@/shared/store";

export const SpinnerGlobal: React.FC = () => {
	const isActive = useSpinnerStore((s) => s.isLoading);

	if (!isActive) return null;

	return (
		<>
			{/* <Box
				position="absolute"
				bgColor="primary.100"
				opacity="0.5"
				width="full"
				h="full"
				display="flex"
				pointerEvents="none"
			/> */}

			{/* <Box position="absolute" width="full" h="full" display="flex">
				<Spinner margin="auto" />
			</Box> */}
		</>
	);
};
