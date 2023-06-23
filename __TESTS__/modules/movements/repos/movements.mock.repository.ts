/* eslint-disable @typescript-eslint/no-unused-vars */
import * as crypto from "crypto";

import { Account } from "@/accounts/domain";
import { Tokens } from "@/auth/schemas";
import { MovementsRepository } from "@/movements/repos";
import {
	MovementCreateTopup,
	MovementGETResponse,
	MovementTopupEndpoint,
} from "@/movements/schemas";
import { IPaginationCriteria } from "@/shared/domain";
import {
	MovementPaymentEndpointMock,
	MovementTopupEndpointMock,
	MovementTransferenceEndpointMock,
} from "@/tests/modules/movements/fixtures";

export function MovementsMockRepository() {
	return {
		create: jest
			.fn()
			.mockImplementation(
				async (
					t: MovementCreateTopup,
					_: Tokens["accessToken"],
					s: AbortSignal
				): Promise<MovementTopupEndpoint> => {
					return {
						...t,
						currency: "ARS",
						updatedAt: new Date(),
						createdAt: new Date(),
						id: crypto.randomUUID(),
					};
				}
			),
		findAll: jest
			.fn()
			.mockImplementation(async function (
				accountId: Account["id"],
				accessToken: Tokens["accessToken"],
				paginationCriteria: IPaginationCriteria,
				abortSignal?: AbortSignal
			): Promise<MovementGETResponse> {
				return {
					movementList: [
						MovementTopupEndpointMock(),
						MovementTopupEndpointMock(),
						MovementTransferenceEndpointMock(),
						MovementPaymentEndpointMock(),
					],
					pagination: {
						page: 1,
						totalPages: 1,
						prevPage: null,
						nextPage: null,
					},
				} satisfies MovementGETResponse;
			}),
		update: jest.fn(),
	} satisfies MovementsRepository;
}
