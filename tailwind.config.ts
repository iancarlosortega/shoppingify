import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#F9A109',
				'primary-lt': '#FFF0DE',
				secondary: '#56CCF2',
				tertiary: '#EB5757',
				background: '#FAFAFE',
				dark: '#454545',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
export default config;
