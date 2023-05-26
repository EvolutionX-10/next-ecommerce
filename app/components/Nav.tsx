"use client";

import type { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Nav({ user }: Session) {
	return (
		<nav className="flex justify-between items-center py-8">
			<Link href={"/"}>
				<h1>Styled</h1>
			</Link>
			<ul className="flex items-center gap-12">
				{!user && (
					<li className="bg-teal-600 text-white py-2 px-4 rounded-md">
						<button onClick={() => signIn()}>Sign In</button>
					</li>
				)}
				{user && (
					<li>
						{user.image && (
							<Image
								className="rounded-full"
								src={user.image}
								alt={user.name!}
								width={48}
								height={48}
							/>
						)}
					</li>
				)}
			</ul>
		</nav>
	);
}
