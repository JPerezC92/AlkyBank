import { ApiError } from '@/Shared/schemas';

type TypeWithKey<T> = { [key: string]: T };

const validationError: TypeWithKey<string> = {
	USER_ALREADY_REGISTERED: 'Email already in use',
} as const;

export function getValidationError(apiError: ApiError) {
	return validationError[apiError.code];
}
