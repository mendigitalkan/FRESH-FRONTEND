import { Button, Modal } from "flowbite-react";
import { BiQuestionMark } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";

interface ModalStyleTypes {
	title: string;
	onBtnYesClick: () => void;
	onBtnNoClick: () => void;
	onOpen?: () => void;
	isOpen: boolean;
}

const ModalStyle = ({
	title,
	onBtnNoClick,
	onBtnYesClick,
	onOpen,
	isOpen = false,
}: ModalStyleTypes) => {
	return (
		<Modal onClose={onOpen} popup show={isOpen} size="md">
			<Modal.Header />
			<Modal.Body>
				<div className="text-center">
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						<p>{title}!</p>
					</h3>
					<div className="flex justify-center gap-4">
						<Button color="gray" onClick={onBtnNoClick}>
							Batalkan
						</Button>
						<Button color="failure" onClick={onBtnYesClick}>
							Ya
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalStyle;
