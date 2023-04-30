import React from "react";

import { AuthLayout, PublicRoute } from "@/auth/containers";

type PublicLayoutProps = { children: React.ReactNode };

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
	return (
		<AuthLayout>
			{({ isAuthenticated, isLoading }) => (
				<PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
					{children}
				</PublicRoute>
			)}
		</AuthLayout>
	);
};
