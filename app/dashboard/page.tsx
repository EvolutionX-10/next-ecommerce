import { PrismaClient } from "@prisma/client";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CustomSession } from "@/pages/api/create-payment-intent";
import { PriceFormatter } from "@/util/PriceFormatter";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
	const prisma = new PrismaClient();
	const user = await getServerSession<AuthOptions, CustomSession>(authOptions);
	if (!user) return null;

	return await prisma.order.findMany({
		where: { userId: user.user.id },
		include: { products: true },
	});
};

export default async function Dashboard() {
	const orders = await fetchOrders();
	if (!orders) return <div>You must be logged in to view this page</div>;
	if (!orders.length) return <div>You have no orders</div>;
	return (
		<div>
			<h1 className="text-bold">Your Orders</h1>
			{orders.map((order) => (
				<div key={order.id} className="my-12 rounded-lg p-8">
					<h2>Order reference: {order.id}</h2>
					<p>Time: {new Date(order.createdDate).toLocaleTimeString()}</p>

					<p className="text-md py-2">
						Status:{" "}
						<span
							className={`${
								order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
							} mx-2 rounded-lg px-2 py-1 text-sm uppercase text-white`}
						>
							{order.status}
						</span>
					</p>
					<p className="font-medium">Total: {PriceFormatter(order.amount)}</p>
					<div className="flex flex-col gap-2">
						{order.products.map((product) => (
							<div key={product.id} className="py-2">
								<h2 className="py-2">{product.name}</h2>
								<div className="flex items-center gap-4">
									<Image src={product.image} height={36} width={36} alt={product.name} />
									<p>{PriceFormatter(product.unit_amount)}</p>
									<p>Quantity: {product.quantity}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
