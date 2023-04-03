import { ApiKnowError } from "@/shared/schemas";

export function isApiError(error: unknown): error is ApiError {
	const { success } = ApiKnowError.safeParse(error);
	return success;
}
