import React from "react";

import { SpinnerHide, SpinnerShow } from "@/shared/components";
import { BackgroundWaves } from "@/shared/components/BackgroundWaves";
import { Redirect } from "@/shared/components/Redirect";
import { webRoutes } from "@/shared/utils";

type PublicRouteProps = {
	children: React.ReactNode;
	isAuthenticated: boolean;
	isLoading: boolean;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({
	children,
	isAuthenticated,
	isLoading,
}) => {
	if (isLoading) {
		return <SpinnerShow />;
	}

	if (!isLoading && isAuthenticated) {
		return <Redirect to={webRoutes.baseRoute} />;
	}

	return (
		<>
			<SpinnerHide />
			<BackgroundWaves />
			{children}
		</>
	);
};
