"use client";

import { useCartStore } from "@/store";
import CartItem from "./CartItem";

export default function Cart() {
	const cart = useCartStore();
	return (
		<div
			onClick={cart.toggleCart}
			className="fixed left-0 top-0 h-screen w-full bg-black/25 backdrop-blur-sm"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="absolute right-0 top-0 min-h-screen w-1/3 bg-white p-12 text-gray-700"
			>
				<h1>Heres your shopping list</h1>
				{cart.cart.map((item) => (
					<CartItem key={item.id} {...item} />
				))}
				<button className="mt-4 w-full rounded-md bg-teal-700 py-2 text-white">Checkout</button>
			</div>
		</div>
	);
}
