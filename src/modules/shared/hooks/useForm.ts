import React from "react";

interface IUseForm<T> {
	values: T;
	onSubmit?: (values: T) => void;
	clearOnSubmit?: boolean;
}

export function useForm<T>(props: IUseForm<T>) {
	const { values: form, onSubmit, clearOnSubmit = true } = props;
	const [values, setValues] = React.useState(form);

	function onChange(
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) {
		const { name, value } = e.target;

		setValues((prevState) => ({ ...prevState, [name]: value }));
	}

	function resetForm() {
		setValues(form);
	}

	function _onSubmit(e?: React.FormEvent<HTMLFormElement>) {
		e?.preventDefault();
		onSubmit?.(values);
		clearOnSubmit && resetForm();
	}

	const _setValues = React.useCallback(
		function _setValues(values: T) {
			setValues((s) => ({ ...s, ...values }));
		},
		[setValues]
	);

	return {
		initialValues: form,
		values,
		onChange,
		onSubmit: _onSubmit,
		setValues: _setValues,
		resetForm,
	} as const;
}
