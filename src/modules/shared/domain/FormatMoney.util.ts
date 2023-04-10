export function FormatMoney(ammount: number, currency: string) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(ammount);
}
