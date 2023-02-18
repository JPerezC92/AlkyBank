import React from "react";

import { useSpinnerStore } from "@/shared/store";

export const SpinnerShow: React.FC = () => {
	const showSpinner = useSpinnerStore((s) => s.show);

	React.useEffect(() => {
		showSpinner();
	}, [showSpinner]);

	return null;
};
