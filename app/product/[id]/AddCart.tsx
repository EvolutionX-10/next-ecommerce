"use client";

import { CartItem, useCartStore } from "@/store";

export default function Cart(
	item: Pick<CartItem, "name" | "id" | "unit_amount" | "quantity" | "image">
) {
	const cart = useCartStore();
	return (
		<button onClick={() => cart.addToCart(item)} className="btn-primary btn-block btn my-12">
			Add to Cart
		</button>
	);
}
