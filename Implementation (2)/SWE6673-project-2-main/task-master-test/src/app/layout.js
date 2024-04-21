// This is the entry point of the app.
// Content displayed in the RootLayout function is displayed across all pages. (e.g. a navbar and footer would go here, if we wanted to use those.)

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next Apps",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head></head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
