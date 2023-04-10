import { render, screen, waitFor } from "@testing-library/react";

import { useAccountStore } from "@/accounts/store";
import { useAuthStore } from "@/auth/store";
import { MovementPreviewCard } from "@/movements/components";
import { MovementList } from "@/movements/containers";
import { ApiKnowError } from "@/shared/schemas";
import { AccountMock } from "@/tests/modules/accounts/fixtures";
import { MovementsMockRepository } from "@/tests/modules/movements/repos";
import { AppWrapperProvider } from "@/tests/utils";

useAuthStore.setState({ accessToken: "accessToken" });
useAccountStore.setState({ accountActive: AccountMock() });

describe("Test <Home /> component", () => {
	test("should contain contain a list of <MovementPreviewCard />", async () => {
		const movementsRepo = MovementsMockRepository();
		const movementPreviewCardId = "movement-preview-card";

		render(
			<ol>
				<MovementList movementsRepository={movementsRepo}>
					{(rp) =>
						rp.movementList.map((movement) => (
							<li key={movement.id}>
								<MovementPreviewCard
									movement={movement}
									data-testid={movementPreviewCardId}
								/>
							</li>
						))
					}
				</MovementList>
			</ol>,
			{ wrapper: AppWrapperProvider() }
		);

		const movementList = await screen.findAllByTestId(movementPreviewCardId);

		await waitFor(() => expect(movementList.length).toBeGreaterThan(0));
	});

	test("should contain a Toast with an error message", async () => {
		const error: ApiKnowError = {
			code: "TEST_API_ERROR",
			message: "An error occurred while retrieving movements",
			statusCode: 500,
		};

		const movementsRepo = MovementsMockRepository();
		movementsRepo.findAll.mockImplementationOnce(() => {
			throw error;
		});

		const movementPreviewCardId = "movement-preview-card";

		render(
			<ol>
				<MovementList movementsRepository={movementsRepo}>
					{(rp) =>
						rp.movementList.map((movement) => (
							<li key={movement.id}>
								<MovementPreviewCard
									movement={movement}
									data-testid={movementPreviewCardId}
								/>
							</li>
						))
					}
				</MovementList>
			</ol>,
			{ wrapper: AppWrapperProvider() }
		);

		const successToast = await screen.findByRole("status");

		expect(successToast).toHaveTextContent(error.message);
	});
});
