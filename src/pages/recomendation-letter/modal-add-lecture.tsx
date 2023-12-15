import { Checkbox, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { LECTURE } from "../../data/lecture";

interface ModalAddLectureTypes {
  onOpen: (item: boolean) => void;
  isOpen: boolean;
  onSelect: (item: any) => void;
}

type LectureType = {
  lecture_code: string;
  lecture_name: string;
};

const ModalAddLecture = ({
  onOpen,
  isOpen,
  onSelect,
}: ModalAddLectureTypes) => {
  const [lectureList, setlectureList] = useState<LectureType[]>([]);
  const [serchResult, setSerachResult] = useState<LectureType[] | any>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === "") {
      setSerachResult(lectureList);
      return;
    }
    const result = lectureList.filter((item: LectureType) => {
      const input = event.target.value.toUpperCase();
      const isMatch = item.lecture_name.toUpperCase().search(input) !== -1;
      if (isMatch) return item;
    });
    setSerachResult(result);
  };

  useEffect(() => {
    setlectureList(LECTURE);
    return () => setSerachResult([]);
  }, []);

  return (
    <Modal dismissible show={isOpen} onClose={() => onOpen(false)}>
      <Modal.Header>Daftar Dosen</Modal.Header>
      <Modal.Body className="py-10 h-96 overflow-scroll">
        <TextInput
          type="text"
          className="mb-5"
          placeholder="search..."
          onChange={handleSearch}
        />
        {serchResult.map((item: LectureType, index: number) => (
          <p
            className="p-2 hover:bg-gray-200 rounded-md cursor-pointer"
            key={index}
            onClick={() => {
              onSelect(item.lecture_name);
              onOpen(false);
            }}
          >
            {item.lecture_name}
          </p>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddLecture;
