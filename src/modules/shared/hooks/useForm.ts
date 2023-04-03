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

	function _onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onSubmit?.(values);
		setValues(form);
	}

	return { values, onChange, onSubmit: _onSubmit } as const;
}
