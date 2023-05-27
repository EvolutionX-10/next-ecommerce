import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { Metadata } from "next";
import Hydrate from "./components/Hydrate";

export const metadata: Metadata = {
	title: "Styled",
	description: "E-commerce site built with Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className="mx-8 min-h-screen lg:mx-60">
				<Hydrate>
					<Nav user={session?.user} expires={session?.expires ?? ""} />
					{children}
				</Hydrate>
			</body>
		</html>
	);
}
