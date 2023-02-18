import { useRouter } from "next/router";
import React from "react";

type RedirectProps = {
	to: string;
};

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
	const router = useRouter();
	React.useEffect(() => {
		router.push(to);
	}, [router, to]);

	return null;
};
