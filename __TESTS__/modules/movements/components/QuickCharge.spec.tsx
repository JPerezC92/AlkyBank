import { act, fireEvent, render, screen } from "@testing-library/react";
import * as crypto from "crypto";

import { QuickCharge } from "@/movements/components";
import { MovementTopupEndpoint } from "@/movements/schemas";
import { MovementsMockRepository } from "@/tests/modules/movements/repos";
import { AppWrapperProvider } from "@/tests/utils";

const quickChargeList = [100, 200];

describe("<QuickCharge />", () => {
	test("should create a new TOPUP movement successfylly", async () => {
		const movementEndpointTopupMock: MovementTopupEndpoint = {
			id: crypto.randomUUID(),
			accountId: "",
			amount: 200,
			concept: "Test",
			createdAt: new Date(),
			date: new Date(),
			currency: "EUR",
			type: "TOPUP",
			updatedAt: new Date(),
		};
		const movementsMockRepo = MovementsMockRepository();
		movementsMockRepo.create.mockResolvedValue(movementEndpointTopupMock);
		render(
			<QuickCharge
				quickChargeList={quickChargeList}
				movementsRepository={movementsMockRepo}
			/>,
			{
				wrapper: AppWrapperProvider(),
			}
		);

		const quickCharge100 = screen.getByText(/100/i);
		act(() => {
			fireEvent.click(quickCharge100);
		});

		const successToast = await screen.findByRole("status");

		expect(movementsMockRepo.create).toHaveBeenCalled();
		expect(successToast).toBeInTheDocument();
	});

	test("should contain the correct number of elements", async () => {
		render(<QuickCharge quickChargeList={quickChargeList} />, {
			wrapper: AppWrapperProvider(),
		});

		expect(screen.getAllByRole("button")).toHaveLength(quickChargeList.length);
	});

	test("should show a Error message when the creation fails", async () => {
		const err: ApiError = {
			code: "TEST_API_ERROR",
			message: "There was a problem with the transaction",
			statusCode: 500,
		};

		const movementsMockRepo = MovementsMockRepository();
		movementsMockRepo.create.mockImplementation(() => {
			throw err;
		});

		render(
			<QuickCharge
				quickChargeList={quickChargeList}
				movementsRepository={movementsMockRepo}
			/>,
			{
				wrapper: AppWrapperProvider(),
			}
		);

		const quickCharge100 = screen.getByText(/100/i);

		act(() => {
			fireEvent.click(quickCharge100);
		});

		const errorToast = await screen.findByRole("status");

		expect(errorToast).toBeInTheDocument();
		expect(errorToast).toHaveTextContent(err.message);
	});
});
