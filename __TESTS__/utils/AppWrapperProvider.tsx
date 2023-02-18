import { ChakraProvider } from "@chakra-ui/react";

import { SpinnerGlobal } from "@/shared/components";
import theme from "@/shared/theme";
import { ToastUtilityConfig } from "@/shared/utils";

import { QueryClientWrapperProvider } from "./QueryClientWrapperProvider.fixture";

export function AppWrapperProvider(): React.FC<{
	children: React.ReactNode;
}> {
	return function AppWrapperComp({ children }) {
		const QueryClientWrapper = QueryClientWrapperProvider();

		return (
			<>
				<QueryClientWrapper>
					<ChakraProvider theme={theme} resetCSS>
						<ToastUtilityConfig />
						{children}
						<SpinnerGlobal />
					</ChakraProvider>
				</QueryClientWrapper>
			</>
		);
	};
}
