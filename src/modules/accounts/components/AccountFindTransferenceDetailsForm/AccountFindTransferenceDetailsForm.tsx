import {
	Button,
	chakra,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import React from "react";
import { FaCheck } from "react-icons/fa";

import { AccountsRepository, AccountTransferReceiver } from "@/accounts/domain";
import { useAccountFindTransferReceiver } from "@/accounts/hooks";
import { IdSchema } from "@/shared/schemas/id.schema";
import { SubjectManager } from "@/shared/utils";

type AccountFindTransferenceDetailsFormProps = {
	accountTransferReceiverSubject: SubjectManager<AccountTransferReceiver | null>;
	accountsRepository?: AccountsRepository;
};

export const AccountFindTransferenceDetailsForm: React.FC<
	AccountFindTransferenceDetailsFormProps
> = ({ accountTransferReceiverSubject, accountsRepository }) => {
	const [toAccountId, setToAccountId] = React.useState("");
	const [isEnabled, setIsEnabled] = React.useState(false);

	const accountTransferReceiver = useAccountFindTransferReceiver({
		accountId: toAccountId,
		enabled: isEnabled,
		accountsRepository,
	});

	const isValidAccountCode = IdSchema.safeParse(toAccountId).success;

	React.useEffect(() => {
		accountTransferReceiver.isFetched && setIsEnabled(false);
		if (!isValidAccountCode || !accountTransferReceiver.error) {
			accountTransferReceiverSubject.setSubject(null);
		}

		if (accountTransferReceiver.data) {
			accountTransferReceiverSubject.setSubject(accountTransferReceiver.data);
		}
	}, [
		accountTransferReceiver.data,
		accountTransferReceiver.error,
		accountTransferReceiver.isFetched,
		accountTransferReceiverSubject,
		isValidAccountCode,
	]);

	return (
		<chakra.form
			display="flex"
			flexDirection="column"
			onSubmit={(e) => {
				e.preventDefault();
				setIsEnabled(true);
			}}
		>
			<FormControl>
				<FormLabel>Account code receiver</FormLabel>
				<Input
					autoFocus
					name="toAccountId"
					focusBorderColor="primary.500"
					type="text"
					borderColor="primary.100"
					value={toAccountId}
					onChange={(e) => setToAccountId(e.target.value)}
				/>
			</FormControl>

			<Button
				leftIcon={<FaCheck />}
				colorScheme="primary"
				marginBlockStart="4"
				type="submit"
				isDisabled={!isValidAccountCode}
				isLoading={accountTransferReceiver.isLoading}
			>
				Check
			</Button>
		</chakra.form>
	);
};
