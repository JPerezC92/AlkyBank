import { ApiKnowError } from "@/shared/schemas";

export const ApiErrorMock = (
	ApiError?: Partial<ApiKnowError>
): ApiKnowError => ({
	code: ApiError?.code || "SERVER_ERROR",
	message: ApiError?.message || "server error",
	statusCode: ApiError?.statusCode || 500,
});
