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
import {
	Movement,
	MovementPayment,
	MovementsQueryKeys,
	MovementTopup,
} from "@/movements/domain";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";
import { useForm } from "@/shared/hooks";
import { isApiError, toastUtility } from "@/shared/utils";
import { queryClient } from "@/src/pages/_app";

type MovementEditFormProps = {
	movement: MovementTopup | MovementPayment;
	movementsRepository?: MovementsRepository;
	onSuccess?: () => void;
};

const validationSchema = z.object({
	concept: z.string(),
	date: z.string().transform((value) => dayjs(value, "YYYY-MM-DD").toDate()),
});

export const MovementEditForm: React.FC<MovementEditFormProps> = ({
	movement,
	onSuccess,
	movementsRepository = MovementsNestJSRepository(),
}) => {
	const { accessToken } = useAuthenticatedStore();
	const mutate = useMutation(
		async (movement: Movement) => {
			return await movementsRepository.update(movement, accessToken);
		},
		{
			onSuccess: () => {
				onSuccess?.();
				queryClient.invalidateQueries(MovementsQueryKeys.all);
				toastUtility.success({
					title: "Movement updated",
				});
			},

			onError: (error) => {
				if (!isApiError(error)) {
					return toastUtility.errorDefault();
				}

				toastUtility.error({
					title: "Something went wrong, please try again later",
					description: error.message,
				});
			},
		}
	);

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
			mutate.mutate(movement.updateValues(validationSchema.parse(values))),
		clearOnSubmit: false,
	});

	const isDisabled =
		values.concept === movement.concept.toString() &&
		values.date === dayjs(movement.date).format("YYYY-MM-DD");

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

				<Button type="submit" colorScheme="primary" isDisabled={isDisabled}>
					Save changes
				</Button>
			</chakra.form>
		</MovementFormWrapper>
	);
};
