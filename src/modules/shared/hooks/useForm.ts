import React from "react";

export function useForm<T>(form: T, onSubmit?: (values: T) => void) {
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

	function _onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onSubmit?.(values);
		resetForm();
	}

	const _setValues = React.useCallback(
		function _setValues(values: T) {
			setValues((s) => ({ ...s, ...values }));
		},
		[setValues]
	);

	return {
		values,
		onChange,
		onSubmit: _onSubmit,
		setValues: _setValues,
	} as const;
}
