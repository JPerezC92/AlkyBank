import { AccountEndpoint } from "@/accounts/schemas";
import { AccountMock } from "@/tests/modules/accounts/fixtures";
import { UserEndpoint } from "@/users/schemas";

export function UserMock(accountMock?: AccountEndpoint[]) {
	const user: UserEndpoint = {
		id: "1",
		firstName: "Jhon",
		lastName: "Doe",
		email: "jhon@doe.com",
		accountList: accountMock || [AccountMock()],
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
	};
	return user;
}
