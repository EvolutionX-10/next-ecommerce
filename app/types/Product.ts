export interface Product {
	id: string;
	name: string;
	unit_amount: number;
	currency: string;
	image: string;
	description: string;
	metadata: {
		features: string;
	};
}
