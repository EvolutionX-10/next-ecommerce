import Stripe from "stripe";
import Product from "./components/Product";

const getProducts = async () => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2022-11-15",
	});
	const products = await stripe.products.list();

	return await Promise.all(
		products.data.map(async (product) => {
			const prices = await stripe.prices.list({product: product.id});
			return {
				name: product.name,
				description: product.description ?? "",
				id: product.id,
				image: product.images[0],
				unit_amount: Number(prices.data[0].unit_amount),
				currency: prices.data[0].currency,
				metadata: {
					features: product.metadata.features ?? "",
				},
			};
		})
	);
};

export default async function Home() {
	const products = await getProducts();

	return (
		<main className="grid grid-cols-fluid gap-12">
			{products.map((product) => (
				<Product key={product.id} {...product} />
			))}
		</main>
	);
}
