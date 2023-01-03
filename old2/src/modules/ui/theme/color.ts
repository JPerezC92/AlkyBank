import {
	ColorScheme,
	generateAlphaPallete,
	generateCssVariables,
	generateCssVariablesKeys,
	generateGradientPallete,
} from '@/UI/utils/Palette';

const LightColorsDefinition: Record<ColorScheme, string> = {
	primary: '#7014f2',
	secondary: '#39beff',
	tertiary: '#404be3',
	success: '#60d394',
	info: '#68d8d6',
	warning: '#ffa630',
	danger: '#d84654',
	light: '#cc00ff',
	dark: '#151531',
	special1: '#00f59b',
	special2: '#1cccff',
	special3: '#ffd000',
};

const DarkColorsDefinition: Record<ColorScheme, string> = {
	primary: '#7014f2',
	secondary: '#39beff',
	tertiary: '#404be3',
	success: '#60d394',
	info: '#68d8d6',
	warning: '#ffa630',
	danger: '#d84654',
	light: '#cc00ff',
	dark: '#151531',
	special1: '#00f59b',
	special2: '#1cccff',
	special3: '#ffd000',
};

const LightPallete = generateGradientPallete(LightColorsDefinition);
const DarkPallete = generateGradientPallete(DarkColorsDefinition);
const LightPalleteWithAlphas = generateAlphaPallete(LightPallete);
const DarkPalleteWithAlphas = generateAlphaPallete(DarkPallete);
export const LightColorsCSSVariables = generateCssVariables(
	LightPalleteWithAlphas,
);

export const DarkColorsCSSVariables = generateCssVariables(
	DarkPalleteWithAlphas,
);

export const color = generateCssVariablesKeys(LightPalleteWithAlphas);
