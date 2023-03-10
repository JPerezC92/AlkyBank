/* eslint-disable @typescript-eslint/no-unused-vars */
import * as crypto from "crypto";

import { Tokens } from "@/auth/schemas";
import { MovementsRepository } from "@/movements/repos";
import {
	MovementCreateTopup,
	MovementEndpointTopup,
} from "@/movements/schemas";

export function MovementsMockRepository() {
	return {
		create: jest
			.fn()
			.mockImplementation(
				async (
					t: MovementCreateTopup,
					_: Tokens["accessToken"],
					s: AbortSignal
				): Promise<MovementEndpointTopup> => {
					return {
						...t,
						updatedAt: new Date(),
						createdAt: new Date(),
						id: crypto.randomUUID(),
					};
				}
			),
	} satisfies MovementsRepository;
}
