export const Button = ({ variant, type = "button", children, disabled, style, ...props }) => {
	return (
		<>
			{variant === 'primary' ? (
				<button
					{...props}
					type={type}
					className={`lg transition-color max-w-full cursor-pointer rounded-md border border-ct-primary-500 bg-ct-primary-500 py-1 px-4 text-[14px] text-white duration-300 hover:bg-opacity-75 disabled:cursor-not-allowed disabled:border-ct-primary-300 disabled:bg-ct-primary-300 ${style}`}
					disabled={disabled}
				>
					{children}
				</button>
			) : variant === 'secondary' ? (
				<button
					{...props}
					type={type}
					className={`transition-color max-w-full cursor-pointer rounded-md border border-white bg-transparent py-1 px-4 text-[14px] text-white duration-300 hover:bg-white hover:bg-opacity-5 ${style}`}
					disabled={disabled}
				>
					{children}
				</button>
			) : variant === 'tertiary' ? (
				<button
					{...props}
					type={type}
					className={`transition-color max-w-full cursor-pointer rounded-md border border-ct-primary-500 bg-transparent py-1 px-4 text-[14px] text-ct-primary-500 duration-300 hover:bg-ct-primary-500 hover:bg-opacity-5 disabled:cursor-not-allowed disabled:border-ct-primary-300 disabled:text-ct-primary-300 ${style}`}
					disabled={disabled}
				>
					{children}
				</button>
			) : variant === 'mini' ? (
				<button
					{...props}
					type={type}
					className="transition-color max-w-fit cursor-default rounded-md border border-white bg-transparent py-2 px-4 text-[12px] text-white duration-300 hover:bg-white hover:bg-opacity-5 lg:cursor-pointer"
				>
					{children}
				</button>
			) : (
				<button {...props} 
				type="button"/>
			)}
		</>
	);
}