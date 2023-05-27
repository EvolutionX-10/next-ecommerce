"use client";

import { useCartStore } from "@/store";

export default function Cart() {
	const cart = useCartStore();
	return <div>Cart</div>;
}
