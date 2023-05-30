import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./app/types/Product";

export interface CartItem extends Omit<Product, "metadata" | "description" | "currency"> {
	quantity: number;
}

interface CartStore {
	cart: CartItem[];
	isOpen: boolean;
	paymentIntent: string;
	checkout: string;
	setPaymentIntent: (intent: string) => void;
	toggleCart: () => void;
	addToCart: (product: CartItem) => void;
	removeFromCart: (product: CartItem) => void;
	setCheckout: (checkout: string) => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			cart: [],
			isOpen: false,
			paymentIntent: "",
			checkout: "cart",
			toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
			addToCart: (product) =>
				set((state) => {
					const index = state.cart.findIndex((item) => item.id === product.id);

					if (index === -1) {
						return {
							cart: [...state.cart, { ...product, quantity: 1 }],
						};
					} else {
						return {
							cart: state.cart.map((item, i) =>
								i === index ? { ...item, quantity: item.quantity + 1 } : item
							),
						};
					}
				}),
			removeFromCart: (product) =>
				set((state) => {
					const index = state.cart.findIndex((item) => item.id === product.id);
					if (index === -1) {
						return {
							cart: [...state.cart],
						};
					} else {
						if (state.cart[index].quantity === 1) {
							return {
								cart: state.cart.filter((item) => item.id !== product.id),
							};
						}
						return {
							cart: state.cart.map((item, i) =>
								i === index ? { ...item, quantity: item.quantity - 1 } : item
							),
						};
					}
				}),
			setPaymentIntent: (intent) => set(() => ({ paymentIntent: intent })),
			setCheckout: (checkout) => set(() => ({ checkout })),
		}),
		{
			name: "cart-store",
		}
	)
);

export const calculateTotal = (cart: CartItem[]) => {
	return cart.reduce((acc, item) => acc + item.unit_amount * item.quantity, 0);
};
