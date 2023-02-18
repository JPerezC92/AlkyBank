export interface MyRepo<T> {
	(mainAbortSignal?: AbortSignal): T;
}
