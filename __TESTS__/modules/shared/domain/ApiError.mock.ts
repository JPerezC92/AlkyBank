import { ApiError } from "@/shared/schemas";

export const ApiErrorMock = (ApiError?: Partial<ApiError>): ApiError => ({
	code: ApiError?.code || "SERVER_ERROR",
	message: ApiError?.message || "server error",
	statusCode: ApiError?.statusCode || 500,
});
