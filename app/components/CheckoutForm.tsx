"use client";

import { calculateTotal, useCartStore } from "@/store";
import { PriceFormatter } from "@/util/PriceFormatter";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
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
				className={`btn-primary btn-block btn mt-4 disabled:opacity-75`}
				id="submit"
				disabled={isLoading || !stripe || !elements}
			>
				<span id="btn-text">{isLoading ? <span>Processing...</span> : <span>Pay Now</span>}</span>
			</button>
		</form>
	);
}

interface CheckoutFormProps {
	clientSecret: string;
}
