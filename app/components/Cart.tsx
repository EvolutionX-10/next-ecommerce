"use client";

import { useCartStore } from "@/store";
import CartItem from "./CartItem";
import Image from "next/image";
import cartImg from "@/public/cart.svg";
import { PriceFormatter } from "@/util/PriceFormatter";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
	const cart = useCartStore();
	const price = cart.cart.reduce((a, b) => {
		return a + b.quantity * b.unit_amount;
	}, 0);

	const cartDisplay = (
		<>
			<button onClick={cart.toggleCart} className="pb-8 text-sm font-bold">
				Back to Store 🏃🏻
			</button>
			<motion.div layout>
				{cart.cart.map((item) => (
					<CartItem key={item.id} {...item} />
				))}
				<h2 className="mt-4 p-2">
					Total: <span className="font-bold">{PriceFormatter(price)}</span>
				</h2>
				<button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">Checkout</button>
			</motion.div>
		</>
	);

	const cartEmpty = (
		<motion.div
			layout
			animate={{ opacity: 0.75, scale: 1, rotateZ: 0 }}
			initial={{ opacity: 0, scale: 0.5, rotateZ: -30 }}
			className="flex flex-col items-center gap-12 pt-56 text-2xl font-medium opacity-75"
		>
			<h1>Ohhh noo.... It's empty 😢</h1>
			<Image src={cartImg} alt="cart" width={200} height={200} />
		</motion.div>
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={cart.toggleCart}
			className="fixed left-0 top-0 h-screen w-full bg-black/25 backdrop-blur-sm"
		>
			<motion.div
				layout
				initial={{ translateX: "75%" }}
				animate={{ translateX: 0 }}
				exit={{ translateX: "100%" }}
				onClick={(e) => e.stopPropagation()}
				className="absolute right-0 top-0 min-h-screen w-full bg-white p-12 text-gray-700 md:w-2/5"
			>
				<AnimatePresence>{cart.cart.length === 0 ? cartEmpty : cartDisplay}</AnimatePresence>
			</motion.div>
		</motion.div>
	);
}
