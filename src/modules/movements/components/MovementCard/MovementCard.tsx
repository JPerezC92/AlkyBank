import {
	Box,
	Button,
	Divider,
	IconButton,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { FaClipboard } from "react-icons/fa";

import { Movement, MovementType } from "@/movements/domain";
import { ModalContainer } from "@/shared/components/ModalContainer";
import { timeAgo } from "@/shared/utils";

type MovementCardProps = {
	movement: Movement;
};

export const MovementCard: React.FC<MovementCardProps> = ({ movement }) => {
	return (
		<Box
			borderColor={
				movement.operationType === MovementType.values.TOPUP
					? "green.500"
					: "red.500"
			}
			borderWidth="1px"
			bg="bg1"
			borderRadius="base"
			textAlign="center"
			boxShadow="md"
		>
			<Box
				borderTopRadius="inherit"
				borderBottom="inherit"
				bg={
					movement.operationType === MovementType.values.TOPUP
						? "green.100"
						: "red.100"
				}
				paddingBlock="2"
				position="relative"
			>
				<Text fontWeight="semibold">{movement.operationType}</Text>

				<Box
					display={
						movement.operationType === MovementType.values.TRANSFERENCE
							? "none"
							: "flex"
					}
					position="absolute"
					insetBlock="0"
					right="2"
					justifyContent="center"
					alignItems="center"
				>
					{movement.operationType !== MovementType.values.TRANSFERENCE && (
						<ModalContainer
							movement={movement}
							trigger={(open) => (
								<Button
									inset="0"
									variant="ghost"
									size="xs"
									colorScheme="secondary"
									onClick={open}
								>
									Edit
								</Button>
							)}
						/>
					)}
				</Box>
			</Box>

			<Box p="4">
				<InputGroup size="xs">
					<InputLeftAddon>Code</InputLeftAddon>
					<Input placeholder="mysite" defaultValue={movement.id} isReadOnly />
					<InputRightAddon p="0" m="0">
						<IconButton
							size="xs"
							icon={<FaClipboard />}
							aria-label="copy"
							onClick={() => navigator.clipboard.writeText(movement.id)}
						/>
					</InputRightAddon>
				</InputGroup>

				<Text
					fontSize="3xl"
					color="primary.400"
					fontWeight="bold"
					marginBlockStart="4"
					marginBlockEnd="2"
				>
					{movement.formatAmount()}
				</Text>

				<Text fontSize="sm">{timeAgo.format(movement.createdAt)}</Text>
			</Box>

			<Divider />

			<Text paddingBlock="2">{movement.concept}</Text>
		</Box>
	);
};
