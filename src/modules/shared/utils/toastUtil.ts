import {
	CreateToastFnReturn,
	useToast,
	UseToastOptions,
} from "@chakra-ui/react";

export let toastRef: CreateToastFnReturn;

export const ToastUtilityConfig: React.FC = () => {
	toastRef = useToast();
	return null;
};

type ConfigWithoutStatus = Omit<UseToastOptions, "status">;

export const toastUtility = {
	toast(config?: UseToastOptions) {
		toastRef({
			duration: 4000,
			position: "bottom",
			variant: "left-accent",
			...config,
		});
	},
	errorDefault(config?: ConfigWithoutStatus) {
		this.toast({
			...config,
			status: "error",
			title: "Unknown Error",
			description: "Try again later",
		});
	},
	error(config?: ConfigWithoutStatus) {
		this.toast({ ...config, status: "error" });
	},
	success(config?: ConfigWithoutStatus) {
		this.toast({ ...config, status: "success" });
	},
	info(config?: ConfigWithoutStatus) {
		this.toast({ ...config, status: "info" });
	},
	loading(config?: ConfigWithoutStatus) {
		this.toast({ ...config, status: "loading" });
	},
};
