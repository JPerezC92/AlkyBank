import clsx from 'clsx';
import React from 'react';

const titleSize = {
	headline1: 'headline1',
	headline2: 'headline2',
	headline3: 'headline3',
	headline4: 'headline4',
	headline5: 'headline5',
	headline6: 'headline6',
} as const;

type TagList = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleSize = (typeof titleSize)[keyof typeof titleSize];

type HeadingProps<Tag extends string> = Tag extends TagList
	? { as?: Tag; size?: TitleSize } & React.ComponentProps<Tag>
	: never;

export const Heading = React.forwardRef(function Heading<
	T extends TagList,
	Props extends HeadingProps<T>,
>(
	{ className, as: Tag = 'h1', size = 'headline1', ...props }: Props,
	ref: Props['ref'],
): React.ReactElement<Props, T> {
	return (
		<Tag
			className={clsx(
				'font-bold',
				{
					'mb-3 text-8xl md:text-9xl leading-[90%]':
						titleSize.headline1 === size,
					'mb-3 text-5xl md:text-6xl leading-[90%]':
						titleSize.headline2 === size,
					'mb-2 text-3xl md:text-4xl leading-[150%]':
						titleSize.headline3 === size,
					'mb-2 text-xl md:text-2xl leading-[150%]':
						titleSize.headline4 === size,
					'mb-2 text-lg md:text-xl leading-[150%]':
						titleSize.headline5 === size,
					'mb-2 text-md md:text-lg leading-[150%]':
						titleSize.headline6 === size,
				},
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
