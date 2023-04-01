import "@/shared/theme/fonts";
import "@/shared/utils/timeAgo";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { SpinnerGlobal } from "@/shared/components";
import theme from "@/shared/theme";
import { ToastUtilityConfig } from "@/shared/utils";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme} resetCSS>
				<SpinnerGlobal />
				<ToastUtilityConfig />
				<Component {...pageProps} />
			</ChakraProvider>
		</QueryClientProvider>
	);
}
