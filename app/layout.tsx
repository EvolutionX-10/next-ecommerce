import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Styled",
	description: "E-commerce site built with Next.js",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className="mx-64 min-h-screen">
				<Nav user={session?.user} expires={session?.expires ?? ""} />
				{children}
			</body>
		</html>
	);
}
