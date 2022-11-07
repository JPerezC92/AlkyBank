import { TransactionCreateSchema } from 'src/schemas/transactionCreate.schema';
import { TransactionEditSchema } from 'src/schemas/transactionEdit.schema';
import { TransactionEndpointSchema } from 'src/schemas/transactionEndpoint.schema';
import { TransactionPOSTEndpointSchema } from 'src/schemas/transactionPOSTEndpoint.schema';
import { constants } from 'src/utils/constants';
import { findAccessToken } from 'src/utils/findAccessToken';
import { formatAccessToken } from 'src/utils/formatAccessToken';
import { HTTPVerbs } from 'src/utils/HTTPVerbs';

export const TransactionsRepository = (signal) => {
	const baseUrl = constants.API_URL + 'transactions';
	return {
		create: async (createTransaction) => {
			const body = TransactionCreateSchema.parse(createTransaction);

			const response = await fetch(baseUrl, {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				signal,
				method: HTTPVerbs.POST,
				body: JSON.stringify(body),
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = TransactionPOSTEndpointSchema.parse(result);
			return validatedResult;
		},

		findAll: async () => {
			const accessToken = findAccessToken();

			const response = await fetch(baseUrl, {
				headers: { accept: 'application/json', Authorization: formatAccessToken(accessToken) },
				signal,
				method: HTTPVerbs.GET,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = TransactionEndpointSchema.parse(result);

			return validatedResult;
		},

		edit: async (editTransaction) => {
			const body = TransactionEditSchema.parse(editTransaction);

			const response = await fetch(baseUrl, {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				signal,
				method: HTTPVerbs.PUT,
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = TransactionEndpointSchema.parse(result);
			return validatedResult;
		},
	};
};