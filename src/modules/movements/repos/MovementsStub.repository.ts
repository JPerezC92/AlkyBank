/* eslint-disable no-mixed-spaces-and-tabs */
import { accountStub1 } from "@/accounts/repos";
import {
	MovementEndpointToModel,
	MovementModelToEndpoint,
} from "@/movements/adapters";
import { MovementType } from "@/movements/domain";
import { MovementEndpoint } from "@/movements/schemas";
import { MyRepo } from "@/shared/repos";

import { MovementsRepository } from "./Movement.repository";

export const movementStub1: MovementEndpoint = {
	id: "1",
	updatedAt: new Date(),
	createdAt: new Date(),
	amount: 100,
	currency: "ARS",
	type: MovementType.values.TOPUP,
	accountId: accountStub1.id,
	concept: "concept",
	date: new Date(),
};

export const movementStub2: MovementEndpoint = {
	id: "2",
	updatedAt: new Date(),
	createdAt: new Date(),
	amount: 100,
	currency: "ARS",
	type: MovementType.values.TOPUP,
	accountId: accountStub1.id,
	concept: "concept",
	date: new Date(),
};

export const movementStub3: MovementEndpoint = {
	id: "3",
	updatedAt: new Date(),
	createdAt: new Date(),
	amount: 100,
	currency: "ARS",
	type: MovementType.values.TOPUP,
	accountId: accountStub1.id,
	concept: "concept",
	date: new Date(),
};

let movementsList: MovementEndpoint[] = [
	movementStub1,
	movementStub2,
	movementStub3,
];

export const MovementsStubRepository: MyRepo<MovementsRepository> = () => {
	return {
		create: async (movement) => {
			const _movement: MovementEndpoint =
				movement.type === MovementType.values.TRANSFERENCE
					? {
							...movement,
							id: movementsList.length.toString(),
							updatedAt: new Date(),
							createdAt: new Date(),
							currency: "ARS",
							type: MovementType.values.TRANSFERENCE,
							isTransferenceReceived: false,
					  }
					: movement.type === MovementType.values.TOPUP
					? {
							...movement,
							id: movementsList.length.toString(),
							updatedAt: new Date(),
							createdAt: new Date(),
							currency: "ARS",
							type: MovementType.values.TOPUP,
					  }
					: {
							...movement,
							id: movementsList.length.toString(),
							updatedAt: new Date(),
							createdAt: new Date(),
							currency: "ARS",
							type: MovementType.values.PAYMENT,
					  };

			movementsList.push(_movement);

			return _movement;
		},

		findAll: async () => {
			return {
				pagination: {
					page: 1,
					totalPages: 1,
					prevPage: null,
					nextPage: null,
				},
				movementList: movementsList.map(MovementEndpointToModel),
			};
		},

		update: async (movement) => {
			const _movementUpdate = MovementModelToEndpoint(movement);
			movementsList = movementsList.map((_movement) =>
				_movement.id === movement.id ? _movementUpdate : _movement
			);

			return movement;
		},
	};
};
