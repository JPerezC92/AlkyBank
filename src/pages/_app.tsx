import "@/shared/theme/fonts";
import "@/shared/utils/timeAgo";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { SpinnerGlobal } from "@/shared/components";
import theme from "@/shared/theme";
import { NextPageWithLayout, ToastUtilityConfig } from "@/shared/utils";

export const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme} resetCSS>
				<SpinnerGlobal />
				<ToastUtilityConfig />
				{getLayout(<Component {...pageProps} />)}
			</ChakraProvider>
		</QueryClientProvider>
	);
}
