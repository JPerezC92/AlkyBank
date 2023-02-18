import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SpinnerStore {
	isLoading: boolean;
	show: () => void;
	hide: () => void;
}

export const useSpinnerStore = create(
	devtools<SpinnerStore>(
		(set) => ({
			isLoading: false,
			hide: () => set({ isLoading: false }),
			show: () => set({ isLoading: true }),
		}),
		{ name: "[SPINNER]" }
	)
);
