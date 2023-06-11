"use client";

import dance from "@/public/dance.webp";
import { useCartStore } from "@/store";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderSuccess() {
	const cart = useCartStore();

	const checkoutOrder = () => {
		setTimeout(() => {
			cart.setCheckout("cart");
		}, 1000);
		cart.toggleCart();
	};

	useEffect(() => {
		cart.setPaymentIntent("");
		cart.clear();
	}, []);

	return (
		<motion.div
			className="my-2 flex items-center justify-center"
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
		>
			<div className="rounded-md p-12 text-center">
				<h1 className="text-xl font-medium">Your Order has been placed 🚀</h1>
				<h2 className="my-4 text-sm ">Check your email for the receipt.</h2>
				<Image src={dance} className="my-8 rounded-sm" alt="dancing" />
				<div className="flex items-center justify-center gap-12 font-medium text-white">
					<Link href={"/dashboard"}>
						<button onClick={checkoutOrder} className="rounded-md bg-teal-600 p-2">
							Check your Order
						</button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
