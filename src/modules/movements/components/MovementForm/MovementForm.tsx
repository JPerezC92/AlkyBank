import {
	Button,
	chakra,
	ChakraProps,
	FormControl,
	FormLabel,
	Input,
	Select,
	Textarea,
} from "@chakra-ui/react";
import { z } from "zod";

import { useAuthStore } from "@/auth/store";
import { useForm } from "@/shared/hooks";
import { ToStringValues } from "@/shared/utils";

const ValidationSchema = z.object({
	amount: z
		.string()
		.min(1)
		.transform((v) => parseInt(v, 10)),
	date: z
		.string()
		.min(1)
		.transform((v) => new Date(v)),
	concept: z.string(),
	accountId: z.string().min(1),
});

type ValidationSchema = z.infer<typeof ValidationSchema>;

type MovementFormProps = {
	onSubmit?: (v: ValidationSchema) => void;
	defaultValues?: ToStringValues<ValidationSchema>;
	isLoading?: boolean;
} & ChakraProps;

export function MovementForm({
	isLoading,
	onSubmit,
	defaultValues,
	...props
}: MovementFormProps) {
	const _defaultValues =
		{
			accountId: "",
			amount: "",
			concept: "",
			date: "",
		} || defaultValues;
	const getCurrencyList = useAuthStore((s) => s?.user)?.accountList;

	const {
		values,
		onChange,
		onSubmit: _onSubmit,
	} = useForm(_defaultValues, (v) => onSubmit?.(ValidationSchema.parse(v)));

	return (
		<chakra.form onSubmit={_onSubmit} {...props} display="contents">
			<FormControl>
				<FormLabel>Currency</FormLabel>
				<Select
					autoFocus
					borderColor="primary.100"
					focusBorderColor="primary.500"
					name="accountId"
					onChange={onChange}
					placeholder="Select a currency"
					// required
					value={values.accountId}
					variant="outline"
				>
					{getCurrencyList?.map((value) => (
						<chakra.option key={value.id} value={value.id}>
							{value.currency}
						</chakra.option>
					))}
				</Select>
			</FormControl>

			<FormControl>
				<FormLabel>Amount</FormLabel>
				<Input
					borderColor="primary.100"
					focusBorderColor="primary.500"
					name="amount"
					onChange={onChange}
					type="number"
					// required
					value={values.amount}
					variant="outline"
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Date</FormLabel>
				<Input
					borderColor="primary.100"
					focusBorderColor="primary.500"
					name="date"
					onChange={onChange}
					type="date"
					// required
					value={values.date}
					variant="outline"
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Concept</FormLabel>
				<Textarea
					borderColor="primary.100"
					focusBorderColor="primary.500"
					placeholder="Write a concept for this movement"
					resize="vertical"
					onChange={onChange}
					value={values.concept}
					// required
					size="sm"
					name="concept"
				/>
			</FormControl>

			<Button
				type="submit"
				colorScheme="primary"
				isLoading={isLoading}
				// isDisabled={!ValidationSchema.safeParse(values).success}
			>
				Create
			</Button>
		</chakra.form>
	);
}
