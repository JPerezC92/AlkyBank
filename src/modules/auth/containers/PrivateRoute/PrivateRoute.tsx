import React from "react";

import { useAuthStore } from "@/auth/store";
import { Redirect } from "@/shared/components";
import { webRoutes } from "@/shared/utils";

type PrivateRouteProps = {
	children: React.ReactNode;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const authLoadingStatus = useAuthStore((s) => s.loadingStatus);

	if (authLoadingStatus === "failed") {
		return <Redirect to={webRoutes.auth.login()} />;
	}

	return <>{children}</>;
};
