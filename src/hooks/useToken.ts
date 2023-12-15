import { useState } from "react";
import { CONFIG } from "../configs";

export default function useToken() {
	const getToken = () => {
		const tokenString = localStorage.getItem(CONFIG.local_storage_key);
		if (tokenString) {
			return tokenString;
		} else {
			return null;
		}
	};

	const [token, setToken] = useState<string | null>(getToken());

	const saveToken = (userToken: string) => {
		localStorage.setItem(CONFIG.local_storage_key, userToken);
		setToken(userToken);
	};

	const removeToken = () => {
		localStorage.removeItem(CONFIG.local_storage_key);
	};

	return {
		setToken: saveToken,
		token,
		removeToken,
		getToken,
	};
}
