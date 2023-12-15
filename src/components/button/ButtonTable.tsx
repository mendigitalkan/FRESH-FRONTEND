export interface IButtonTable {
	title: string;
	onClick?: () => void;
	onSubmit?: () => void;
	variant: "danger" | "primary";
	isDisagele?: boolean;
}

const ButtonTable = (props: IButtonTable) => {
	const color = props.variant === "danger" ? "red" : "teal";
	return (
		<button
			onClick={props.onClick}
			onSubmit={props.onSubmit}
			disabled={props.isDisagele || false}
			className={`bg-transparent text-sm hover:bg-${color}-500 text-${color}-700 hover:text-white py-1 px-3 border border-${color}-500 hover:border-transparent rounded-md`}
		>
			{props.title}
		</button>
	);
};

export default ButtonTable;
