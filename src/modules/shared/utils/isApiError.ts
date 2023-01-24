import { ApiError } from '@/Shared/schemas';

export const isApiError = (o: unknown): o is ApiError => {
	return ApiError.safeParse(o).success;
};
