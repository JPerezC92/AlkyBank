import { extendTheme } from "@chakra-ui/react";

import Button from "./components/Button";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	primary: {
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
		50: "#d8fffa",
		100: "#abfff1",
		200: "#7bffe7",
		300: "#48ffdd",
		400: "#1affd4",
		500: "#00e6ba",
		600: "#00b391",
		700: "#008068",
		800: "#004e3d",
		900: "#001c15",
	},
	accent: {
		50: "#fff2db",
		100: "#ffd9b0",
		200: "#fbc281",
		300: "#f9aa52",
		400: "#f69122",
		500: "#dd7809",
		600: "#ac5d04",
		700: "#7c4302",
		800: "#4c2700",
		900: "#1f0b00",
	},
};

export default extendTheme({
	colors,
	components: {
		Button,
	},
	styles: {
		global: {
			"html, body": { minHeight: "100vh" },
			"#__next": {
				display: "grid",
				minHeight: "100vh",
			},
		},
	},
});
