import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Roboto } from "next/font/google";
import Hydrate from "./components/Hydrate";
import Nav from "./components/Nav";
import "./globals.css";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin-ext"],
});

export const metadata: Metadata = {
	title: "Styled",
	description: "E-commerce site built with Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en" className={roboto.className}>
			<body className="min-h-screen px-8 md:px-32 lg:px-60">
				<Hydrate>
					<Nav user={session?.user} expires={session?.expires ?? ""} />
					{children}
				</Hydrate>
			</body>
		</html>
	);
}
