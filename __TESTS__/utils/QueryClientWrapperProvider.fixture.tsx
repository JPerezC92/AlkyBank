import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryClientWrapperProvider(): React.FC<{
	children: React.ReactNode;
}> {
	const queryClient = new QueryClient({
		logger: { log: () => ({}), warn: () => ({}), error: () => ({}) },
		defaultOptions: { mutations: {}, queries: { retry: false } },
	});

	return function QueryClientWrapperComp({ children }) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
	};
}
