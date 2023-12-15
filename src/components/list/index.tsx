import { ButtonStyle } from "../button";

const ListItemStyle = ({
	title,
	description,
	url,
	isDownloadButton = false,
}: {
	title: string;
	description?: string;
	url?: string;
	isDownloadButton?: boolean;
}) => {
	return (
		<div className="grid grid-cols-5 items-center py-2 text-gray-500 ">
			<dt className="col-span-2">{title}</dt> <p>:</p>
			{url ? (
				<a href={url} target="blank" className="text-sm col-span-2">
					<button
						className={`bg-transparent text-sm hover:bg-teal-500 text-teal-700 hover:text-white py-1 px-3 border border-teal-500 hover:border-transparent rounded-md`}
					>
						{isDownloadButton ? "Download" : `Lihat file`}
					</button>
				</a>
			) : (
				<dd className="text-sm col-span-2">{description || "_"}</dd>
			)}
		</div>
	);
};

export default ListItemStyle;
