import { PriceFormatter } from "@/util/PriceFormatter";
import Image from "next/image";
import AddCart from "./AddCart";

export default async function Product({ searchParams, params }: ProductPageProps) {
	let { name, image, description, unit_amount, id } = searchParams;
	id ??= params.id;

	return (
		<div className="flex flex-wrap justify-between gap-4 text-gray-700 sm:flex-nowrap md:gap-24">
			<Image
				src={image}
				alt={name}
				height={1000}
				width={1000}
				className="h-96 w-full rounded-lg object-cover"
			/>
			<div className="py-2 font-medium">
				<h1 className="text-2xl">{name}</h1>
				<p className="text-gray-600">{description}</p>
				<div className="flex gap-2">
					<p className="font-bold text-gray-500">{PriceFormatter(+unit_amount)}</p>
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
