import React from "react";

import { useSpinnerStore } from "@/shared/store";

export const SpinnerHide: React.FC = () => {
	const hideSpinner = useSpinnerStore((s) => s.hide);

	React.useEffect(() => {
		hideSpinner();
	}, [hideSpinner]);

	return null;
};
