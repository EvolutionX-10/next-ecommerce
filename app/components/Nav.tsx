"use client";

import { useCartStore } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import Cart from "./Cart";

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
					<AnimatePresence>
						{cart.cart.length > 0 && (
							<motion.span
								animate={{ scale: 1 }}
								initial={{ scale: 0 }}
								exit={{ scale: 0 }}
								className="absolute bottom-4 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-teal-700 text-sm font-bold text-white"
							>
								{cart.cart.length}
							</motion.span>
						)}
					</AnimatePresence>
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
			<AnimatePresence>{cart.isOpen && <Cart />}</AnimatePresence>
		</nav>
	);
}
