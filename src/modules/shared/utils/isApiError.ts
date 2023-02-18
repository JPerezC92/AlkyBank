import { ApiError } from "@/shared/schemas";

export function isApiError(error: unknown): error is ApiError {
	const { success } = ApiError.safeParse(error);
	return success;
}
