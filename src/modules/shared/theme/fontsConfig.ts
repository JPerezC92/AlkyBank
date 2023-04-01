function fontsInit() {
	let montserratAlternates = "";
	let texturina = "";

	return {
		get montserratAlternates() {
			return montserratAlternates;
		},
		get texturina() {
			return texturina;
		},
		set montserratAlternates(value: string) {
			montserratAlternates = value;
		},
		set texturina(value: string) {
			texturina = value;
		},
	};
}

export const fontsConfig = fontsInit();
