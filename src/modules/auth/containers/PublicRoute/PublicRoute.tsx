import React from "react";

import { useAuthStore } from "@/auth/store";
import { BackgroundWaves } from "@/shared/components/BackgroundWaves";
import { Redirect } from "@/shared/components/Redirect";
import { webRoutes } from "@/shared/utils";

type PublicRouteProps = {
	children: React.ReactNode;
};

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
	const authLoadingStatus = useAuthStore((s) => s.loadingStatus);

	if (authLoadingStatus === "succeeded") {
		return <Redirect to={webRoutes.baseRoute} />;
	}

	return (
		<>
			<BackgroundWaves />
			{children}
		</>
	);
};
