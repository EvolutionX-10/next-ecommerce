"use client";

import { useCartStore } from "@/store";
import CartItem from "./CartItem";
import Image from "next/image";
import cartImg from "@/public/cart.svg";
import { PriceFormatter } from "@/util/PriceFormatter";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";

export default function Cart() {
	const cart = useCartStore();
	const price = cart.cart.reduce((a, b) => {
		return a + b.quantity * b.unit_amount;
	}, 0);

	const cartDisplay = (
		<motion.div layout>
			{cart.cart.map((item) => (
				<CartItem key={item.id} {...item} />
			))}
			<h2 className="mt-4 p-2">
				Total: <span className="font-bold">{PriceFormatter(price)}</span>
			</h2>
			<button
				onClick={() => cart.setCheckout("checkout")}
				className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white"
			>
				Checkout
			</button>
		</motion.div>
	);

	const checkoutDisplay = <Checkout />;

	const display =
		cart.checkout === "cart" ? (
			cartDisplay
		) : cart.checkout === "checkout" ? (
			checkoutDisplay
		) : cart.checkout === "success" ? (
			<OrderSuccess />
		) : null;

	const cartEmpty = (
		<motion.div
			layout
			animate={{ opacity: 0.75, scale: 1, rotateZ: 0 }}
			initial={{ opacity: 0, scale: 0.5, rotateZ: -30 }}
			className="flex flex-col items-center gap-12 pt-56 text-2xl font-medium opacity-75"
		>
			<h1 className="text-center">Ohhh no.. It's empty! 😢</h1>
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
				{cart.checkout === "success" ? null : (
					<button
						onClick={() => {
							cart.checkout === "checkout" ? cart.setCheckout("cart") : cart.toggleCart();
						}}
						className="pb-8 text-sm font-bold"
					>
						{cart.checkout === "cart" ? "Back to Store 🏃🏻" : "Back to Cart 🛒"}
					</button>
				)}
				<AnimatePresence>
					{cart.cart.length === 0 && cart.checkout === "cart" ? cartEmpty : display}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	);
}
