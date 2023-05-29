"use client";

import type { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";

export default function Nav({ user }: Session) {
	const cart = useCartStore();
	return (
		<nav className="flex items-center justify-between pb-12 pt-6">
			<Link href={"/"}>
				<h1>Styled</h1>
			</Link>
			<ul className="flex items-center gap-10">
				<li
					onClick={() => cart.toggleCart()}
					className="relative flex cursor-pointer items-center text-3xl"
				>
					<AiFillShopping />
					<span
						className={`absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white ${
							cart.cart.length === 0 ? "hidden" : ""
						}`}
					>
						{cart.cart.length}
					</span>
				</li>
				{!user && (
					<li className="rounded-md bg-teal-600 px-4 py-2 text-white">
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
								width={32}
								height={32}
							/>
						)}
					</li>
				)}
			</ul>
			{cart.isOpen && <Cart />}
		</nav>
	);
}
