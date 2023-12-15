export interface ButtonStyleTypes {
	color?: "teal" | "red" | "yelow";
	className?: string;
	title: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	onSubmit?: () => void;
	disabled?: boolean;
}

export const ButtonStyle = ({
	color = "teal",
	title,
	className,
	type = "button",
	onClick,
	disabled = false,
}: ButtonStyleTypes) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={
				`bg-transparent m-1 text-sm hover:bg-${color}-500 text-${color}-700 hover:text-white py-1 px-3 border border-${color}-500 hover:border-transparent rounded-md ` +
				className
			}
		>
			{title}
		</button>
	);
};
