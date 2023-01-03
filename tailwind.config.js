const colors = require('tailwindcss/colors');

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
				// bg1: '#FEF6FF',
				bg1: '#FDF7FF',
				primary: '#7014f2',
				text: '#382B47',
			},
		},
	},
	plugins: [],
};
