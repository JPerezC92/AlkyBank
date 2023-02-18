import React from "react";

import { AuthLayout, PrivateRoute } from "@/auth/containers";
import { AppLayout } from "@/shared/components";

type PrivateLayoutProps = {
	children: React.ReactNode;
};

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
	return (
		<AuthLayout>
			<PrivateRoute>
				<AppLayout>{children}</AppLayout>
			</PrivateRoute>
		</AuthLayout>
	);
};
