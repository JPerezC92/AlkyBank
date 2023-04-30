import { ChakraComponent, Heading } from "@chakra-ui/react";
import React from "react";

import { AccountTransferReceiver } from "@/accounts/domain";
import {
	MovementForm,
	MovementFormWrapper,
} from "@/movements/components/MovementForm";
import { MovementType } from "@/movements/domain";
import { useMovementCreateMut } from "@/movements/mutation";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";
import { SubjectManager } from "@/shared/utils";

type MovementTransferCreateFormProps = {
	movementsRepository?: MovementsRepository;
	accountTransferReceiverSubject: SubjectManager<AccountTransferReceiver | null>;
} & Parameters<ChakraComponent<"div">>[0];

export const MovementTransferCreateForm: React.FC<
	MovementTransferCreateFormProps
> = ({
	accountTransferReceiverSubject,
	movementsRepository = MovementsNestJSRepository(),
	...props
}) => {
	const [accountTransferReceiver, setAccountTransferReceiver] =
		React.useState<AccountTransferReceiver | null>(null);
	const movementCreateMut = useMovementCreateMut(movementsRepository);

	React.useEffect(() => {
		accountTransferReceiverSubject.getSubject().subscribe((v) => {
			setAccountTransferReceiver(v);
		});
	}, [accountTransferReceiverSubject]);

	return (
		<MovementFormWrapper {...props}>
			<Heading as="h2" textAlign="center" size="xl" position="relative">
				Transference Details
			</Heading>

			<MovementForm
				isLoading={movementCreateMut.isLoading}
				disableFields={!accountTransferReceiver}
				onSubmit={(values) => {
					if (!accountTransferReceiver) return;

					movementCreateMut.mutate({
						...values,
						type: MovementType.values.TRANSFERENCE,
						toAccountId: accountTransferReceiver.id,
					});
				}}
				isTransference
			/>
		</MovementFormWrapper>
	);
};
