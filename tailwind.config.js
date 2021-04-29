module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				"gray-main": "#777777"
			},
			boxShadow: {
				yellow: "0 4px 12px 0 rgba(245, 158, 11, 50%)",
				slight:
					"0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.01)"
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
