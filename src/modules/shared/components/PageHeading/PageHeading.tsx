import { ComponentWithAs, Heading, HeadingProps } from "@chakra-ui/react";
import React from "react";

type PageHeadingProps = Parameters<ComponentWithAs<"h2", HeadingProps>>[0];

export const PageHeading: React.FC<PageHeadingProps> = ({
	children,
	...props
}) => {
	return (
		<Heading
			size={{ base: "3xl", md: "4xl" }}
			color="primary.700"
			textTransform="uppercase"
			marginBlockEnd="8"
			{...props}
		>
			{children}
		</Heading>
	);
};
