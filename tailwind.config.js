module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			boxShadow: {
				yellow: "0 4px 12px 0 rgba(245, 158, 11, 50%)"
			},
			dropShadow: {
				lightning: "0 2px 6px rgba(245, 158, 11, 50%)"
			},
			screens: {
				"3xl": "2500px",
				"4xl": "2800px"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
