import {
	Box,
	Button,
	chakra,
	ChakraComponent,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	Text,
} from "@chakra-ui/react";
import React from "react";

import { AccountEndpoint } from "@/accounts/schemas";
import { currencyDefault } from "@/currencies/domain";
import { MovementFilterTypeEnum } from "@/movements/domain";
import { IMovementCriteria } from "@/shared/domain";
import { useForm } from "@/shared/hooks";
import { ToStringValues } from "@/shared/utils";

type MovementFilterControlProps = {
	defaultValues?: Partial<ToStringValues<IMovementCriteria>>;
	onSubmit: (movementFilter: Required<IMovementCriteria>) => void;
	onClear?: (movementFilter: Required<IMovementCriteria>) => void;
	accountList: AccountEndpoint[];
} & Omit<Parameters<ChakraComponent<"fieldset">>[0], "onSubmit">;

export const MovementFilterControl: React.FC<MovementFilterControlProps> = ({
	defaultValues,
	onSubmit,
	onClear,
	accountList,
	...props
}) => {
	const {
		values,
		onSubmit: _onSubmit,
		onChange,
		resetForm,
		initialValues,
	} = useForm<Required<ToStringValues<IMovementCriteria>>>({
		values: {
			accountId:
				defaultValues?.accountId ??
				(accountList.find((a) => a.currency === currencyDefault)?.id ||
					accountList[0].id),
			operationType: MovementFilterTypeEnum.values.ALL,
			concept: "",
		},
		onSubmit: (v) => onSubmit(v as Required<IMovementCriteria>),
		clearOnSubmit: false,
	});

	function handleClearForm() {
		onClear?.(initialValues as Required<IMovementCriteria>);
		resetForm();
	}

	return (
		<Box
			as="fieldset"
			bg="bg1"
			borderColor="primary.100"
			borderRadius="base"
			borderWidth="1px"
			boxShadow="md"
			display="flex"
			flexWrap="wrap"
			gap="4"
			p="4"
			{...props}
		>
			<chakra.legend px="2">
				<Heading as="span" size="sm">
					Filters
				</Heading>
			</chakra.legend>

			<chakra.form display="contents" onSubmit={_onSubmit}>
				<FormControl flex="1">
					<FormLabel>Currency</FormLabel>

					<Select
						name="accountId"
						value={values.accountId}
						onChange={onChange}
						variant="outline"
						focusBorderColor="primary.500"
						borderColor="primary.100"
					>
						{accountList?.map((a) => (
							<Text as="option" key={a.id} value={a.id}>
								{a.currency}
							</Text>
						))}
					</Select>
				</FormControl>

				<FormControl flex="1">
					<FormLabel>Operation</FormLabel>
					<Select
						name="operationType"
						value={values.operationType}
						onChange={onChange}
						variant="outline"
						focusBorderColor="primary.500"
						borderColor="primary.100"
					>
						{MovementFilterTypeEnum.iterable.map((o) => (
							<Text as="option" key={o} value={o}>
								{o}
							</Text>
						))}
					</Select>
				</FormControl>

				<FormControl>
					<FormLabel>Concept</FormLabel>
					<Input
						name="concept"
						value={values.concept}
						onChange={onChange}
						variant="outline"
						focusBorderColor="primary.500"
						borderColor="primary.100"
						type="text"
					/>
				</FormControl>

				<Button
					width="full"
					colorScheme="accent"
					variant="outline"
					flex={{ base: "1", lg: "none" }}
					onClick={handleClearForm}
				>
					Clear
				</Button>

				<Button
					type="submit"
					width="full"
					colorScheme="primary"
					flex={{ base: "1", lg: "none" }}
				>
					Search
				</Button>
			</chakra.form>
		</Box>
	);
};
