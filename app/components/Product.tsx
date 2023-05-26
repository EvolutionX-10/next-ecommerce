import { PriceFormatter } from "@/util/PriceFormatter";
import Image from "next/image";
import Link from "next/link";
import type { Product as ProductType } from "../types/Product";

export default function Product(product: ProductType) {
	return (
		<Link
			href={{
				pathname: `/product/${product.id}`,
				query: {
					id: product.id,
					name: product.name,
					description: product.description,
					currency: product.currency,
					features: product.metadata.features,
					unit_amount: product.unit_amount,
					image: product.image,
				},
			}}
			className="text-gray-700"
		>
			<Image
				src={product.image}
				alt={product.name}
				height={800}
				width={800}
				className="w-full h-80 object-cover rounded-lg"
			/>
			<div className="font-medium">
				<h1>{product.name}</h1>
				<h2 className="text-sm text-gray-500">
					{PriceFormatter(product.unit_amount, product.currency.toUpperCase())}
				</h2>
			</div>
		</Link>
	);
}
