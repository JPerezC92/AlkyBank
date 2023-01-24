import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from '@/Shared/components/ToastContainer';

export function AppTestWrapper(): React.FC<{
	children: React.ReactElement;
}> {
	const queryClient = new QueryClient();

	return function QueryClientWrapper({ children }) {
		return (
			<>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
				<ToastContainer />
			</>
		);
	};
}
