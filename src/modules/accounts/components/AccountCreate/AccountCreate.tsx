import {
	Button,
	chakra,
	FormControl,
	FormLabel,
	Select,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";

import { AccountsRepository } from "@/accounts/domain";
import { AccountsNestJSRepository } from "@/accounts/repos";
import { CurrenciesRepository } from "@/currencies/domain";
import { useCurrenciesFindQuery } from "@/currencies/hooks";
import { CurrenciesNestJsRepository } from "@/currencies/repos";
import { useForm } from "@/shared/hooks";
import { isApiError, toastUtility } from "@/shared/utils";

type AccountCreateProps = {
	currenciesRepository?: CurrenciesRepository;
	accountsRepository?: AccountsRepository;
} & React.ComponentProps<typeof chakra.form>;

export const AccountCreate: React.FC<AccountCreateProps> = ({
	currenciesRepository = CurrenciesNestJsRepository(),
	accountsRepository = AccountsNestJSRepository(),
	...props
}) => {
	const { data: currencies } = useCurrenciesFindQuery(currenciesRepository);

	const { mutate: onSubmit } = useMutation(
		async (currency: string) => {
			const account = await accountsRepository.create(currency);
			return account;
		},
		{
			onSuccess: (account) => {
				toastUtility.success({
					title: `Account ${account.currency} created`,
				});
			},
			onError: (e) => {
				if (!isApiError(e)) {
					return toastUtility.errorDefault();
				}

				toastUtility.error({
					title: "Error creating account",
					description: e.message,
				});
			},
		}
	);

	const { onChange, onSubmit: handleSubmit } = useForm({
		onSubmit: (values) => {
			onSubmit(values.currency);
		},
		values: {
			currency: "",
		},
		clearOnSubmit: false,
	});

	return (
		<chakra.form
			onSubmit={handleSubmit}
			display="flex"
			flexDirection="column"
			{...props}
		>
			<FormControl mb="4">
				<FormLabel>Select an account</FormLabel>
				<Select
					onChange={onChange}
					name="currency"
					variant="outline"
					focusBorderColor="primary.500"
					borderColor="primary.100"
				>
					{currencies?.map((currency) => (
						<option key={currency}>{currency}</option>
					))}
				</Select>
			</FormControl>

			<Button type="submit" colorScheme="primary">
				Submit
			</Button>
		</chakra.form>
	);
};
