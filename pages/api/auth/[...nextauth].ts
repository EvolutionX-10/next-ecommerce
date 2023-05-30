import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	adapter: PrismaAdapter(prisma),
	events: {
		createUser: async ({ user }) => {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
				apiVersion: "2022-11-15",
			});

			const customer = await stripe.customers.create({
				email: user.email || undefined,
				name: user.name || undefined,
			});

			await prisma.user.update({
				where: { id: user.id },
				data: { stripeCustomerId: customer.id },
			});
		},
	},
	callbacks: {
		session: async ({ session, user, token }) => {
			session.user = user;
			return session;
			// return Promise.resolve(session);
		},
	},
};
export default NextAuth(authOptions);
