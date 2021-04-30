import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>CareerFinder</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1'
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
