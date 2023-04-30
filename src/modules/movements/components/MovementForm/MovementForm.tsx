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
import dayjs from "dayjs";
import { z } from "zod";

import { useAuthStore } from "@/auth/store";
import { useForm } from "@/shared/hooks";
import { ToStringValues } from "@/shared/utils";

const ValidationSchema = z
	.object({
		amount: z
			.string()
			.min(1)
			.transform((v) => parseInt(v, 10)),
		date: z.string().optional(),
		concept: z.string(),
		accountId: z.string().min(1),
	})
	.transform(({ date, ...rest }) => ({
		...rest,
		date: date && date.length > 0 ? new Date(date) : new Date(),
	}));

type ValidationSchema = z.infer<typeof ValidationSchema>;

type MovementFormProps = {
	disableFields?: boolean;
	onSubmit?: (v: ValidationSchema) => void;
	defaultValues?: ToStringValues<ValidationSchema>;
	isLoading?: boolean;
	isTransference?: boolean;
} & ChakraProps;

export function MovementForm({
	disableFields = false,
	isTransference = false,
	isLoading,
	onSubmit,
	defaultValues,
	...props
}: MovementFormProps) {
	const _defaultValues = defaultValues || {
		accountId: "",
		amount: "",
		concept: "",
		date: isTransference ? "" : dayjs().format("YYYY-MM-DD"),
	};
	const getCurrencyList = useAuthStore((s) => s?.user)?.accountList;

	const {
		values,
		onChange,
		onSubmit: _onSubmit,
	} = useForm({
		values: _defaultValues,
		onSubmit: (v) => onSubmit?.(ValidationSchema.parse(v)),
	});

	return (
		<chakra.form onSubmit={_onSubmit} {...props} display="contents">
			<FormControl isDisabled={disableFields}>
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

			<FormControl isDisabled={disableFields}>
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

			{!isTransference && (
				<FormControl isDisabled={disableFields}>
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
			)}

			<FormControl isDisabled={disableFields}>
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
				isDisabled={!ValidationSchema.safeParse(values).success}
			>
				Create
			</Button>
		</chakra.form>
	);
}
