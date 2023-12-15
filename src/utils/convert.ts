import moment from "moment";

export const convertStatusName = (status: "waiting" | "accepted" | "rejected" | any) => {
	switch (status) {
		case "waiting":
			return "menunggu";
		case "accepted":
			return "selesai";
		case "rejected":
			return "ditolak";
		default:
			break;
	}
};

export const converDateTimeFromDB = (time: any) => {
	return moment(time).format("DD-MM-YYYY");
};
