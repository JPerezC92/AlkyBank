const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'src/app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
		'src/pages/**/*.{js,ts,jsx,tsx}',
		'src/modules/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				// 'tm-primary': '#7014f2',
				// 'tm-primary-dark': '#4907A6',
				// 'tm-primary-light': '#7C23F9',
				// 'tm-secondary': '#00B28D',
				// 'tm-secondary-dark': '#00785B',
				// 'tm-secondary-light': '#00B995',
				// 'tm-bg-1': '#FDF7FF',
				// 'tm-bg-2': '#FF7848',
				// 'tm-text': '#382B47',
				// 'tm-text-accent': '#00785B',
				// 'tm-field-primary': '#4907A6',
				// 'tm-field-secondary': '#00785B',
				// 'tm-outline': '#009EFF',
				// 'tm-success': '#60d394',
				// 'tm-info': '#68d8d6',
				// 'tm-warning': '#ffa630',
				// 'tm-danger': '#d84654',
			},
			fontFamily: {
				comfortaa: [
					'var(--font-montserrat-alternates)',
					...defaultTheme.fontFamily.mono,
				],
			},
		},
	},
	plugins: [require('daisyui')],
};
