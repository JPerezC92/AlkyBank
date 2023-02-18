import { defineStyleConfig } from "@chakra-ui/react";

type ColorScheme = "primary" | "secondary";
type Variant = Partial<Record<ColorScheme, Record<string, string>>>;

const variants: Variant = {
	secondary: { color: "secondary.800" },
};

export default defineStyleConfig({
	baseStyle: {
		fontWeight: "bold",
		textTransform: "uppercase",
		borderRadius: "base",
	},
	variants: {
		solid: ({ colorScheme }) => ({
			...variants[colorScheme as unknown as ColorScheme],
		}),
	},

	defaultProps: {},
});
