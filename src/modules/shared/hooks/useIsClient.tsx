import React from "react";

export function useIsClient() {
	const [value, setValue] = React.useState(false);

	React.useEffect(() => {
		setValue(true);
	}, []);

	return value;
}
