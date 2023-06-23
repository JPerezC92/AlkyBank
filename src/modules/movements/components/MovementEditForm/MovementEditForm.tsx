import {
	Button,
	chakra,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Textarea,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import { z } from "zod";

import { useAuthenticatedStore } from "@/auth/store";
import { MovementFormWrapper } from "@/movements/components";
import { Movement, MovementPayment, MovementTopup } from "@/movements/domain";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";
import { useForm } from "@/shared/hooks";

type MovementEditFormProps = {
	movement: MovementTopup | MovementPayment;
	movementsRepository?: MovementsRepository;
};

const validationSchema = z.object({
	concept: z.string(),
	date: z.string().transform((value) => new Date(value)),
});

export const MovementEditForm: React.FC<MovementEditFormProps> = ({
	movement,
	movementsRepository = MovementsNestJSRepository(),
}) => {
	const { accessToken } = useAuthenticatedStore();
	const mut = useMutation(async (movement: Movement) => {
		return await movementsRepository.update(accessToken, movement);
	});

	const {
		values,
		onSubmit: _onSubmit,
		onChange,
	} = useForm({
		values: {
			concept: movement.concept.toString(),
			date: dayjs(movement.date).format("YYYY-MM-DD"),
		},
		onSubmit: (values) =>
			mut.mutate(movement.updateValues(validationSchema.parse(values))),
	});

	return (
		<MovementFormWrapper>
			<Heading as="h2" textAlign="center" size="xl" position="relative">
				Edit {movement.operationType} movement
			</Heading>

			<chakra.form display="contents" onSubmit={_onSubmit}>
				<FormControl isReadOnly>
					<FormLabel>Currency</FormLabel>
					<Input
						type="text"
						defaultValue={movement.currency}
						variant="outline"
						borderColor="primary.100"
						focusBorderColor="primary.500"
					/>
				</FormControl>

				<FormControl isReadOnly>
					<FormLabel>Ammount</FormLabel>
					<Input
						type="text"
						defaultValue={movement.amount}
						variant="outline"
						borderColor="primary.100"
						focusBorderColor="primary.500"
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Date</FormLabel>
					<Input
						type="date"
						name="date"
						value={values.date}
						onChange={onChange}
						variant="outline"
						borderColor="primary.100"
						focusBorderColor="primary.500"
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Concept</FormLabel>
					<Textarea
						autoFocus
						name="concept"
						onChange={onChange}
						value={values.concept}
						variant="outline"
						borderColor="primary.100"
						focusBorderColor="primary.500"
					/>
				</FormControl>

				<Button type="submit" colorScheme="primary">
					Save changes
				</Button>
			</chakra.form>
		</MovementFormWrapper>
	);
};
