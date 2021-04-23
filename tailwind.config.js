module.exports = {
	mode: "jit",
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			boxShadow: {
				yellow: "0 4px 12px 0 rgba(245, 158, 11, 50%)"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
