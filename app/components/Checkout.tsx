"use client";

import CheckoutAnimation from "@/app/components/CheckoutAnimation";
import { useCartStore } from "@/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
	const cart = useCartStore();
	const router = useRouter();
	const [clientSecret, setClientSecret] = useState<string>("");

	useEffect(() => {
		// create a payment intent as soon as the page loads
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ items: cart.cart, payment_intent_id: cart.paymentIntent }),
		})
			.then((res) => {
				if (res.status === 403) {
					return router.push("/api/auth/signin");
				}
				return res.json();
			})
			.then((data) => {
				setClientSecret(data.paymentIntent.client_secret);
				cart.setPaymentIntent(data.paymentIntent.id);
			});
	}, []);

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: "stripe",
			labels: "floating",
		},
	};

	if (!clientSecret) return <CheckoutAnimation />;

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<Elements options={options} stripe={stripePromise}>
				<CheckoutForm clientSecret={clientSecret} />
			</Elements>
		</motion.div>
	);
}
