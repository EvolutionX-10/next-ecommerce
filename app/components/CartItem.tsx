import { CartItem } from "@/store";
import { PriceFormatter } from "@/util/PriceFormatter";
import Image from "next/image";

export default function CartItem(item: CartItem) {
	return (
		<div className="flex gap-4 py-4">
			<Image
				className="h-24 w-24 rounded-md object-cover"
				src={item.image}
				alt={item.name}
				width={120}
				height={120}
			/>
			<div>
				<h2>{item.name}</h2>
				<h2>Quantity: {item.quantity}</h2>
				<p className="text-sm">{PriceFormatter(item.unit_amount)}</p>
			</div>
		</div>
	);
}
