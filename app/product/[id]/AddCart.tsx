"use client";

import { CartItem, useCartStore } from "@/store";

export default function Cart(
	item: Pick<CartItem, "name" | "id" | "unit_amount" | "quantity" | "image">
) {
	const cart = useCartStore();
	console.log("Log from AddCart");
	console.log(item);
	console.log("-----------------------");
	return (
		<button
			onClick={() => cart.addToCart(item)}
			className="my-12 rounded-md bg-teal-600 px-6 py-2 font-medium text-white"
		>
			Add to Cart
		</button>
	);
}
