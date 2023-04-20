import {
	Box,
	ChakraComponent,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import React from "react";

import { AccountTransferReceiver } from "@/accounts/domain";
import { useForm } from "@/shared/hooks";
import { SubjectManager } from "@/shared/utils";

type AccountTransferenceInfoProps = {
	accountTransferReceiverSubject: SubjectManager<AccountTransferReceiver | null>;
} & Parameters<ChakraComponent<"div">>[0];

export const AccountTransferenceInfo: React.FC<
	AccountTransferenceInfoProps
> = ({ accountTransferReceiverSubject: accountReceiver, ...props }) => {
	const { values, setValues } = useForm({
		id: "",
		ownerFullName: "",
		currency: "",
	});

	React.useEffect(() => {
		const subscription = accountReceiver.getSubject().subscribe((account) => {
			setValues({
				id: account?.id || "",
				ownerFullName: account?.ownerFullName() || "",
				currency: account?.currency || "",
			});
		});

		return () => subscription.unsubscribe();
	}, [accountReceiver, setValues]);

	return (
		<Box {...props}>
			<FormControl isReadOnly>
				<FormLabel>Account code</FormLabel>

				<Input
					type="text"
					value={values.id}
					borderColor="accent.300"
					focusBorderColor="accent.500"
				/>
			</FormControl>

			<FormControl isReadOnly>
				<FormLabel>Owner</FormLabel>

				<Input
					type="text"
					value={values.ownerFullName}
					borderColor="accent.300"
					focusBorderColor="accent.500"
				/>
			</FormControl>

			<FormControl isReadOnly>
				<FormLabel>Currency</FormLabel>

				<Input
					type="text"
					value={values.currency}
					borderColor="accent.300"
					focusBorderColor="accent.500"
				/>
			</FormControl>
		</Box>
	);
};
