import { AccountEndpointToModel } from "@/accounts/adapters";
import { User } from "@/users/domain";
import { UserEndpoint } from "@/users/schemas";

export function UserEndpointToModel(uE: UserEndpoint) {
	return new User({
		accountList: uE.accountList.map(AccountEndpointToModel),
		createdAt: uE.createdAt,
		email: uE.email,
		firstName: uE.firstName,
		id: uE.id,
		lastName: uE.lastName,
		updatedAt: uE.updatedAt,
	});
}
