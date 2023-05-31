"use client";

import { useState, useEffect, FormEvent } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PriceFormatter } from "@/util/PriceFormatter";
import { useCartStore } from "@/store";
import { calculateTotal } from "@/store";

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
	const stripe = useStripe();
	const elements = useElements();

	const [isLoading, setIsLoading] = useState(false);
	const cart = useCartStore();

	useEffect(() => {
		if (!stripe || !clientSecret) return;
	}, [stripe]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) return;
		setIsLoading(true);

		stripe.confirmPayment({ elements, redirect: "if_required" }).then((result) => {
			if (!result.error) {
				cart.setCheckout("success");
			}
			setIsLoading(false);
		});
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit} className="text-gray-600">
			<PaymentElement
				id="payment-element"
				options={{
					layout: "tabs",
				}}
			/>
			<h1 className="py-4 text-sm font-bold">Total: {PriceFormatter(calculateTotal(cart.cart))}</h1>
			<button
				className={`mt-4 w-full rounded-md bg-teal-700 py-2 text-white disabled:opacity-75`}
				id="submit"
				disabled={isLoading || !stripe || !elements}
			>
				<span id="btn-text">
					{isLoading ? <span>Processing 👀</span> : <span>Pay Now 🔥</span>}
				</span>
			</button>
		</form>
	);
}

interface CheckoutFormProps {
	clientSecret: string;
}
