// eslint-disable-next-line camelcase
import { Montserrat_Alternates, Texturina } from "@next/font/google";

import { fontsConfig } from "./fontsConfig";

export const montserratAlternates = Montserrat_Alternates({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
	variable: "--font-montserrat-alternates",
	display: "block",
});

export const texturina = Texturina({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
	variable: "--texturina",
	display: "block",
});

fontsConfig.montserratAlternates = montserratAlternates.style.fontFamily;
fontsConfig.texturina = texturina.style.fontFamily;
