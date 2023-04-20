import { extendTheme } from "@chakra-ui/react";

import Button from "@/shared/theme/components/Button";

import { fontsConfig } from "./fontsConfig";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	bg1: "#ffffff",
	primary: {
		base: "#8453F9",
		50: "#eee4ff",
		100: "#cab4ff",
		200: "#a783fc",
		300: "#8453f9",
		400: "#6022f6",
		500: "#4709dd",
		600: "#3706ad",
		700: "#26047d",
		800: "#17024d",
		900: "#09001f",
	},
	secondary: {
		base: "#4cd1ce",
		50: "#d9fffc",
		100: "#adfff2",
		200: "#7dffe9",
		300: "#4dffe1",
		400: "#25ffd8",
		500: "#13e6bf",
		600: "#00b394",
		700: "#00806a",
		800: "#004e40",
		900: "#001c15",
	},
	danger: {
		50: "#ffe4e4",
		100: "#fdb8b8",
		200: "#f58b8b",
		300: "#ef5c5c",
		400: "#e92f2f",
		500: "#d01616",
		600: "#a30f10",
		700: "#74080a",
		800: "#480304",
		900: "#1f0000",
	},
	accent: {
		50: "#fefee6",
		100: "#fdf8ba",
		200: "#fbec8c",
		300: "#fbda5f",
		400: "#f9c439",
		500: "#e0a22b",
		600: "#ae7420",
		700: "#7d4c16",
		800: "#4a270a",
		900: "#190b01",
	},
	// accent: {
	// 	50: "#fff2db",
	// 	100: "#ffd9b0",
	// 	200: "#fbc281",
	// 	300: "#f9aa52",
	// 	400: "#f69122",
	// 	500: "#dd7809",
	// 	600: "#ac5d04",
	// 	700: "#7c4302",
	// 	800: "#4c2700",
	// 	900: "#1f0b00",
	// },
	success: {
		50: "#dbfff3",
		100: "#aeffe1",
		200: "#7effcf",
		300: "#4dffbb",
		400: "#22ffa9",
		500: "#0fe68f",
		600: "#00b36f",
		700: "#00804e",
		800: "#004e2e",
		900: "#001c0d",
	},
	info: {
		50: "#dcf7ff",
		100: "#afe3ff",
		200: "#82cffa",
		300: "#53bbf7",
		400: "#25a8f3",
		500: "#0c8eda",
		600: "#006faa",
		700: "#004f7b",
		800: "#002f4d",
		900: "#00121f",
	},
};

export default extendTheme({
	colors,
	components: {
		Button,
	},
	fonts: {
		body: fontsConfig.montserratAlternates,
		heading: fontsConfig.texturina,
	},
	styles: {
		global: {
			"html, body, #__next": {
				minHeight: "100%",
				display: "flex",
				flexDirection: "column",
				flex: "1 0 auto",
			},
		},
	},
});
