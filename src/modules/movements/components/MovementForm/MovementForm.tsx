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

import { useAuthStore } from "@/auth/store";
import {
	MovementCreatePayment,
	MovementCreateTopup,
} from "@/movements/schemas";
import { useForm } from "@/shared/hooks";

type ToStringValues<T extends object> = {
	[k in keyof T]: string;
};

type MovementFormProps<T extends object> = {
	onSubmit?: (v: T) => void;
	defaultValues?: T;
} & ChakraProps;

export function MovementForm<
	Values extends ToStringValues<
		Omit<MovementCreateTopup | MovementCreatePayment, "type">
	>
>({ onSubmit, defaultValues, ...props }: MovementFormProps<Values>) {
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
	} = useForm(_defaultValues, (v) => onSubmit?.(v as unknown as Values));

	return (
		<chakra.form onSubmit={_onSubmit} {...props}>
			<FormControl>
				<FormLabel>Currency</FormLabel>
				<Select
					autoFocus
					borderColor="primary.100"
					focusBorderColor="primary.500"
					name="accountId"
					onChange={onChange}
					placeholder="Select a currency"
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
					size="sm"
					name="concept"
				/>
			</FormControl>

			<Button type="submit" colorScheme="primary">
				Create
			</Button>
		</chakra.form>
	);
}
