import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const uploadImageToFirebase = async ({ imageRef, file }: any) => {
	const snapshot = await uploadBytesResumable(imageRef, file);
	const url = await getDownloadURL(snapshot.ref);
	return url;
};
