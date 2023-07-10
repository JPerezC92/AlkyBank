import {
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import { MovementEditForm } from "@/movements/components/MovementEditForm";
import { Movement, MovementPayment, MovementTopup } from "@/movements/domain";

type ModalContainerProps = {
	movement: MovementTopup | MovementPayment;
	onSubmit?: (values: Movement) => void;
	trigger: (onOpen: () => void) => React.ReactNode;
};

export const ModalContainer: React.FC<ModalContainerProps> = ({
	trigger,
	movement,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			{trigger(onOpen)}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent bg="bg1" width="auto">
					<ModalBody p="0">
						<MovementEditForm movement={movement} onSuccess={() => onClose()} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
