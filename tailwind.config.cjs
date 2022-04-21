module.exports = {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			colors: {
				'm-gray': '#727A85',
				'm-blue': '#6E92C4',
				'd-gray': '#1D2633',
				'd-blue': '#4A6385',
				'l-brown': '#856830',
				'l-blue': '#2D9CDB',
				'b-blue': '#56CCF2',
				// 'd-purple': '#9B51E0',
				'd-purple': '#BE185D',
				'l-purple': '#BB6BD9',
				'm-yellow': '#f0e68c',
				// Official theme
				'dark-orchid': '#471ca8',
				'cyber-grape': '#884ab2',
				'orange-soda': '#ff930a',
				'orange-sunset': '#f24b04',
				'soft-rose': '#d1105a',
				'sunshine-daisy': '#ffd500',
				'pink-lavendar': '#eccaff',

				'danger-red': '#ef233c',
				'safe-green': '#6eeb83'
			},
			fontFamily: {
				// 'body': ['Jost', 'sans-serif']
				'display': ['Besley Regular', 'sans'],
				'body': ['Jost', 'serif']
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio')
	]
};
