import { Accordion } from "flowbite-react";

const faqList = [
	{
		title: "What is Lorem ipsum?",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dolorem voluptatem ullam praesentium suscipit iure hic sunt optio beatae consectetur atque modi ducimus error, laudantium deleniti possimus libero expedita dicta!",
	},
	{
		title: "What is Lorem ipsum?",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dolorem voluptatem ullam praesentium suscipit iure hic sunt optio beatae consectetur atque modi ducimus error, laudantium deleniti possimus libero expedita dicta!",
	},
	{
		title: "What is Lorem ipsum?",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dolorem voluptatem ullam praesentium suscipit iure hic sunt optio beatae consectetur atque modi ducimus error, laudantium deleniti possimus libero expedita dicta!",
	},
	{
		title: "What is Lorem ipsum?",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dolorem voluptatem ullam praesentium suscipit iure hic sunt optio beatae consectetur atque modi ducimus error, laudantium deleniti possimus libero expedita dicta!",
	},
];

const FaQ = () => {
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow sp-8">
			<Accordion>
				{faqList.map((item, index) => (
					<Accordion.Panel key={index}>
						<Accordion.Title>{item.title}</Accordion.Title>
						<Accordion.Content>
							<p className="mb-2 text-gray-500">{item.description}</p>
						</Accordion.Content>
					</Accordion.Panel>
				))}
			</Accordion>
		</div>
	);
};

export default FaQ;
