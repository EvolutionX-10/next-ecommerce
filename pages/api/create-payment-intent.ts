import { calculateTotal } from "@/store";
import { PrismaClient, type Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions, Session, getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const userSession = await getServerSession<AuthOptions, CustomSession>(req, res, authOptions);

	if (!userSession) {
		res.status(403).json({ error: "Unauthorized" });
		return;
	}

	const { items, payment_intent_id } = req.body;

	const orderData = {
		user: { connect: { id: userSession.user.id } },
		amount: calculateTotal(items),
		currency: "inr",
		status: "pending",
		paymentIntentId: payment_intent_id,
		products: {
			create: items.map((item: Product) => ({
				name: item.name,
				description: item.description,
				unit_amount: item.unit_amount,
				quantity: item.quantity,
				image: item.image,
			})),
		},
	};

	// check if the payment intent id is present, just update the order
	if (payment_intent_id) {
		const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

		if (current_intent) {
			const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
				amount: calculateTotal(items),
			});
			// fetch order with product ids
			const order = await prisma.order.findUnique({
				where: { paymentIntentId: payment_intent_id },
				include: { products: true },
			});

			if (!order) return res.status(400).json({ message: "Invalid Payment Intent" });

			// update the existing order
			const updatedOrder = await prisma.order.update({
				where: { id: order.id },
				data: {
					status: current_intent.status,
					amount: calculateTotal(items),
					products: {
						deleteMany: {},
						create: items.map((item: Product) => ({
							name: item.name,
							description: item.description,
							unit_amount: item.unit_amount,
							quantity: item.quantity,
							image: item.image,
						})),
					},
				},
			});

			return res.status(200).json({ paymentIntent: updated_intent, order: updatedOrder });
		}
	} else {
		// create new order with prisma
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateTotal(items),
			currency: "inr",
			automatic_payment_methods: { enabled: true },
			// Verify your integration in this guide by including this parameter
			metadata: { integration_check: "accept_a_payment" },
		});

		orderData.paymentIntentId = paymentIntent.id;
		const newOrder = await prisma.order.create({ data: orderData });

		return res.status(200).json({ paymentIntent, order: newOrder });
	}
}

export interface CustomSession extends Session {
	user: {
		id: string;
		name: string;
		email: string;
		image: string;
		stripeCustomerId: string;
	};
}
