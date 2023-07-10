import { fireEvent, render, screen } from "@testing-library/react";

import { MovementEndpointToModel } from "@/movements/adapters";
import { MovementEditForm } from "@/movements/components/MovementEditForm";
import { MovementTopup } from "@/movements/domain";
import {
	MovementsStubRepository,
	movementStub1,
} from "@/movements/repos/MovementsStub.repository";
import { AppWrapperProvider } from "@/tests/utils";

describe("<MovementEditForm />", () => {
	test("should update a Movement successfully", async () => {
		// GIVEN
		render(
			<MovementEditForm
				movement={
					MovementEndpointToModel(movementStub1) as unknown as MovementTopup
				}
				movementsRepository={MovementsStubRepository()}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		// WHEN
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button");

		fireEvent.change(conceptInput, { target: { value: "Test concept" } });
		fireEvent.click(submitButton);

		// THEN
		expect(conceptInput).toHaveValue("Test concept");
		expect(await screen.findByText(/Movement updated/i)).toBeInTheDocument();
	});

	test("should show a Error message when the update fails", async () => {
		// GIVEN
		const movementsRepository = MovementsStubRepository();
		jest.spyOn(movementsRepository, "update").mockImplementation(() => {
			// eslint-disable-next-line no-throw-literal
			throw { message: "There was a problem", code: "TEST", statusCode: 500 };
		});

		render(
			<MovementEditForm
				movement={
					MovementEndpointToModel(movementStub1) as unknown as MovementTopup
				}
				movementsRepository={movementsRepository}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		// WHEN
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button");

		fireEvent.change(conceptInput, { target: { value: "Test concept" } });
		fireEvent.click(submitButton);

		// THEN
		expect(conceptInput).toHaveValue("Test concept");
		expect(await screen.findByText(/There was a problem/i)).toBeInTheDocument();
	});
});
