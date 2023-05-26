import { PriceFormatter } from "@/util/PriceFormatter";
import Image from "next/image";

export default async function Product({ searchParams }: ProductPageProps) {
	const { name, image, description, unit_amount } = searchParams;
	return (
		<div className="flex justify-between gap-24 p-12 text-gray-700">
			<Image
				src={image}
				alt={name}
				height={800}
				width={800}
				className="w-full h-80 object-cover rounded-lg"
			/>
			<div className="font-medium py-2">
				<h1 className="text-2xl">{name}</h1>
				<p className="text-gray-600">{description}</p>
				<div className="flex gap-2">
					<p className="font-bold text-teal-400">{PriceFormatter(+unit_amount)}</p>
				</div>
				<button className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export interface ProductPageProps {
	params: Params;
	searchParams: SearchParams;
}
export interface Params {
	id: string;
}
export interface SearchParams {
	id: string;
	name: string;
	description: string;
	currency: string;
	features: string;
	unit_amount: string;
	image: string;
}
