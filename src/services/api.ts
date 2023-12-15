import axios from "axios";
import { CONFIG } from "../configs";
import { UserTypes } from "../models/user";

export interface GetTableDataTypes {
	url: string;
	pagination?: boolean | true;
	page?: number | 0;
	size?: number | 10;
	filters?: any;
}

export const getHeaders = () => {
	const user = localStorage.getItem(CONFIG.local_storage_key) || "";
	const result: UserTypes = JSON.parse(user);
	return {
		"x-user-id": result.userId,
		"x-department-id": result.departmentId,
		"x-study-program-id": result.studyProgramId,
		"x-user-role": result.userRole,
	};
};

export class ServiceHttp {
	private baseUrl = CONFIG.base_url_api;

	public async get({ path }: { path: string }) {
		try {
			const result = await axios.get(this.baseUrl + path, {
				auth: {
					username: CONFIG.authorization.username,
					password: CONFIG.authorization.passsword,
				},
				headers: {
					...getHeaders(),
				},
			});
			return result.data.data;
		} catch (error: any) {
			console.log(error.response.data.error_message || error.message);
			throw Error(error.response.data.error_message || error.message);
		}
	}

	public async post({ path, body }: { path: string; body: any }) {
		try {
			const result = await axios.post(this.baseUrl + path, body, {
				auth: {
					username: CONFIG.authorization.username,
					password: CONFIG.authorization.passsword,
				},
				headers: {
					...getHeaders(),
				},
			});
			return result.data;
		} catch (error: any) {
			console.log(error.response.data.error_message || error.message);
			throw Error(error.response.data.error_message || error.message);
		}
	}

	public async patch({ path, body }: { path: string; body: any }) {
		try {
			const result = await axios.patch(this.baseUrl + path, body, {
				auth: {
					username: CONFIG.authorization.username,
					password: CONFIG.authorization.passsword,
				},
				headers: {
					...getHeaders(),
				},
			});
			return result.data;
		} catch (error: any) {
			console.log(error.response.data.error_message || error.message);
			throw Error(error.response.data.error_message || error.message);
		}
	}

	public async remove({ path }: { path: string }) {
		try {
			const result = await axios.delete(this.baseUrl + path, {
				auth: {
					username: CONFIG.authorization.username,
					password: CONFIG.authorization.passsword,
				},
				headers: {
					...getHeaders(),
				},
			});
			return result.data;
		} catch (error: any) {
			console.log(error.response.data.error_message || error.message);
			throw Error(error.response.data.error_message || error.message);
		}
	}

	public async getTableData(params: GetTableDataTypes) {
		const { url, pagination, page, size, filters } = params;
		try {
			const queryFilter = new URLSearchParams(filters).toString();
			const result = await axios.get(
				`${url}?pagination=${pagination}&page=${page}&size=${size}&${queryFilter}`,
				{
					auth: {
						username: CONFIG.authorization.username,
						password: CONFIG.authorization.passsword,
					},
					headers: {
						...getHeaders(),
					},
				}
			);
			return {
				...result.data.data,
				page: page,
				size: size,
			};
		} catch (error: any) {
			console.log(error.response.data.error_message || error.message);
			throw Error(error.response.data.error_message || error.message);
		}
	}
}
