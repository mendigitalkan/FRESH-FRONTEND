import {
  AiOutlineAudit,
  AiOutlineFile,
  AiOutlineFolderOpen,
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineVerified,
} from "react-icons/ai";
import { BiBookOpen, BiTask } from "react-icons/bi";
import { FaRegListAlt, FaUserGraduate } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { BsCheckCircle, BsPersonVcard, BsQuestionCircle } from "react-icons/bs";

const HomeMenu = {
  title: "Beranda",
  path: "/",
  icon: <AiOutlineHome fontSize={20} />,
};

const RecomendationLetterMenu = {
  title: "Surat Rekomendasi",
  path: "/recomendation-letters",
  icon: <AiOutlineAudit fontSize={20} />,
};

const TranskripMenu = {
  title: "Transkrip",
  path: `/transkrip`,
  icon: <BiTask fontSize={20} />,
};

const SksConverionMenu = {
  title: "Skema Konversi SKS",
  path: `/sks-convertions`,
  icon: <BiTask fontSize={20} />,
};

const MbkmProgramStudentMenu = {
  title: "Program Saya",
  path: `/mbkm-program-students`,
  icon: <AiOutlineFolderOpen fontSize={20} />,
};

const MBKMProgramMenu = {
  title: "Program MBKM",
  path: "/mbkm-programs",
  icon: <AiOutlineFolderOpen fontSize={20} />,
};

const MBKMProgramProdiMenu = {
  title: "Program MBKM",
  path: "/mbkm-programs/prodi",
  icon: <AiOutlineFolderOpen fontSize={20} />,
};

const ReportParticipationMenu = {
  title: "Lapor Keikutsertaan",
  path: "/report-participations",
  icon: <BsPersonVcard fontSize={20} />,
};

const ProgramProposalMenu = {
  title: "Program Proposal",
  path: "/program-proposal",
  icon: <AiOutlineFile fontSize={20} />,
};

const StudentMenu = {
  title: "Mahasiswa",
  path: "/students",
  icon: <FaUserGraduate fontSize={20} />,
};

const StudyProgramMenu = {
  title: "Program Studi",
  path: "/study-programs",
  icon: <AiOutlineFundProjectionScreen fontSize={20} />,
};

const SemesterMenu = {
  title: "Semester",
  path: "/semesters",
  icon: <FaRegListAlt fontSize={20} />,
};

const MBKMLogBookMenu = {
  title: "Log book",
  path: "/log-books",
  icon: <FiFileText fontSize={20} />,
};

const MataKuliahMenu = {
  title: "Mata Kuliah",
  path: "/mata-kuliah",
  icon: <BiBookOpen fontSize={20} />,
};

const MataKuliahVerificationMenu = {
  title: "Verifikasi Mata Kuliah",
  path: "/mata-kuliah/verification",
  icon: <BsCheckCircle fontSize={20} />,
};

const LogActivityMenu = {
  title: "Log aktifitas",
  path: "/log-activities",
  icon: <AiOutlineSearch fontSize={20} />,
};

const FaQMenu = {
  title: "FaQ",
  path: "/FaQ",
  icon: <BsQuestionCircle fontSize={20} />,
};

export const studentMenus = {
  persiapan: [HomeMenu, MbkmProgramStudentMenu, TranskripMenu],
  pelaksanaan: [ReportParticipationMenu, RecomendationLetterMenu],
  akhir: [MBKMLogBookMenu, FaQMenu],
};

export const studyProgramMenus = {
  persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
  pelaksanaan: [
    StudentMenu,
    MBKMProgramProdiMenu,
    MataKuliahMenu,
    SksConverionMenu,
  ],
  akhir: [MBKMLogBookMenu, FaQMenu],
};

export const departmentMenus = {
  persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
  pelaksanaan: [StudentMenu, StudyProgramMenu, MBKMProgramMenu],
  akhir: [MBKMLogBookMenu, FaQMenu],
};

export const LP3MMenus = {
  persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
  pelaksanaan: [
    StudentMenu,
    StudyProgramMenu,
    SemesterMenu,
    MBKMProgramMenu,
    MataKuliahVerificationMenu,
  ],
  akhir: [MBKMLogBookMenu, LogActivityMenu, FaQMenu],
};

export const AcademicMenus = {
  persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
  pelaksanaan: [
    StudentMenu,
    StudyProgramMenu,
    SemesterMenu,
    MBKMProgramMenu,
    MataKuliahVerificationMenu,
  ],
  akhir: [MBKMLogBookMenu, LogActivityMenu, FaQMenu],
};
