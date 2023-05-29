"use client";

import { useCartStore } from "@/store";
import CartItem from "./CartItem";
import Image from "next/image";
import cartImg from "@/public/cart.svg";

export default function Cart() {
	const cart = useCartStore();

	const cartDisplay = (
		<>
			<h1>Here's your shopping list</h1>
			{cart.cart.map((item) => (
				<CartItem key={item.id} {...item} />
			))}
			<button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">Checkout</button>
		</>
	);

	const cartEmpty = (
		<div className="flex flex-col items-center gap-12 pt-56 text-2xl font-medium opacity-75">
			<h1>Ohhh noo.... It's empty 😢</h1>
			<Image src={cartImg} alt="cart" width={200} height={200} />
		</div>
	);

	return (
		<div
			onClick={cart.toggleCart}
			className="fixed left-0 top-0 h-screen w-full bg-black/25 backdrop-blur-sm"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="absolute right-0 top-0 min-h-screen w-1/3 bg-white p-12 text-gray-700"
			>
				{cart.cart.length === 0 ? cartEmpty : cartDisplay}
			</div>
		</div>
	);
}
