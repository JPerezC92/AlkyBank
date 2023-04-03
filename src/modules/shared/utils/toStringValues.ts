export type ToStringValues<T extends object> = {
	[k in keyof T]: string;
};
