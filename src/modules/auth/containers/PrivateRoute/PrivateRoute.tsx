import React from "react";

import { Redirect, SpinnerHide, SpinnerShow } from "@/shared/components";
import { webRoutes } from "@/shared/utils";

type PrivateRouteProps = {
	isAuthenticated: boolean;
	isLoading: boolean;
	children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	isAuthenticated,
	isLoading,
}) => {
	if (isLoading) {
		return <SpinnerShow />;
	}

	if (!isLoading && !isAuthenticated) {
		return <Redirect to={webRoutes.auth.login()} />;
	}

	return (
		<>
			<SpinnerHide />

			{children}
		</>
	);
};
