export const PriceFormatter = (price: number, currency = "INR"): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(price / 100);
};
