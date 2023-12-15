import { Link } from "react-router-dom";
import { CustomFlowbiteTheme, ListGroup } from "flowbite-react";

type MenuItems = { title: string; path: string; icon: any };

interface NavbarItemGroupTypes {
	title: String;
	items: MenuItems[];
	onClickItem?: () => void;
}

const NavbarItemGroup = ({ title, items, onClickItem }: NavbarItemGroupTypes) => {
	const customTheme: CustomFlowbiteTheme["listGroup"] = {
		root: {
			base: "list-none rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 text-left",
		},
		item: {
			base: "[&>*]:first:rounded-t-lg [&>*]:last:rounded-b-lg [&>*]:last:border-b-0",
			link: {
				base: "flex w-full border-b border-gray-200 py-2 px-4 ",
				active: {
					off: "hover:bg-gray-100 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700",
					on: "bg-gray-700 text-white",
				},
				href: {
					off: "",
					on: "",
				},
				icon: "mr-2 h-4 w-4 fill-current",
			},
		},
	};

	return (
		<ListGroup theme={customTheme} className="mb-5 w-80 hover:color-gray">
			<div className="bg-gray-200 p-2 ">
				<p>{title}</p>
			</div>

			{items.map((item: MenuItems, index) => (
				<Link key={index} to={item.path} onClick={onClickItem}>
					<div className="flex gap-5 p-2 hover:bg-yellow-100 border rounded-sm">
						<div>{item.icon}</div>
						<div>{item.title}</div>
					</div>
				</Link>
			))}
		</ListGroup>
	);
};

export default NavbarItemGroup;
