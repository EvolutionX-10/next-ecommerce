import { PriceFormatter } from "@/util/PriceFormatter";
import Image from "next/image";
import AddCart from "./AddCart";

export default async function Product({ searchParams, params }: ProductPageProps) {
	const { name, image, description, unit_amount, id } = searchParams;
	console.log(params);

	return (
		<div className="flex flex-wrap justify-between gap-4 p-2 text-gray-700 sm:flex-nowrap md:gap-24 lg:p-12">
			<Image
				src={image}
				alt={name}
				height={800}
				width={800}
				className="h-80 w-full rounded-lg object-cover"
			/>
			<div className="py-2 font-medium">
				<h1 className="text-2xl">{name}</h1>
				<p className="text-gray-600">{description}</p>
				<div className="flex gap-2">
					<p className="font-bold text-teal-400">{PriceFormatter(+unit_amount)}</p>
				</div>
				<AddCart id={id} image={image} name={name} quantity={1} unit_amount={+unit_amount} />
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
