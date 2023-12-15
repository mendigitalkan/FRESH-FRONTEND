import { CONFIG } from "../configs";
import { AppContextTypes, useAppContext } from "../context/app.context";
import { ServiceHttp } from "../services/api";

interface PostRequestTypes {
  path: string;
  body: any;
}

interface GetRequestTypes {
  path: string;
}

interface RemoveRequestTypes {
  path: string;
  body?: any;
}

interface UpdateRequestTypes {
  path: string;
  body: any;
}

interface GetTabelDataRequestTypes {
  path: string;
}

export interface HttpRequestTypes {
  handleGetRequest: (value: GetRequestTypes) => void;
  handlePostRequest: (value: PostRequestTypes) => void;
  handleRemoveRequest: (value: RemoveRequestTypes) => void;
  handleGetTableDataRequest: (value: GetTabelDataRequestTypes) => void;
}

export const useHttp = () => {
  const { setErrorMessage }: AppContextTypes = useAppContext();
  const httpService = new ServiceHttp();

  const handleGetRequest = async ({ path }: GetRequestTypes) => {
    try {
      const result = await httpService.get({
        path,
      });
      return result;
    } catch (error: any) {
      console.error(error?.message);
      setErrorMessage({ isError: true, message: error?.message });
    }
  };

  const handlePostRequest = async ({ path, body }: PostRequestTypes) => {
    try {
      const result = await httpService.post({
        path,
        body,
      });
      return result;
    } catch (error: any) {
      console.error(error?.message);
      setErrorMessage({ isError: true, message: error?.message });
    }
  };

  const handleRemoveRequest = async ({ path, body }: RemoveRequestTypes) => {
    try {
      const result = await httpService.remove({
        path,
      });
      return result;
    } catch (error: any) {
      console.error(error?.message);
      setErrorMessage({ isError: true, message: error?.message });
    }
  };

  const handleUpdateRequest = async ({ path, body }: UpdateRequestTypes) => {
    try {
      const result = await httpService.patch({
        path,
        body,
      });
      return result;
    } catch (error: any) {
      console.error(error?.message);
      setErrorMessage({ isError: true, message: error?.message });
    }
  };

  const handleGetTableDataRequest = async ({
    path,
  }: GetTabelDataRequestTypes) => {
    try {
      const result = await httpService.getTableData({
        url: CONFIG.base_url_api + path,
        pagination: true,
        page: 0,
        size: 10,
        filters: {
          search: "",
        },
      });
      return result;
    } catch (error: any) {
      console.error(error?.message);
      setErrorMessage({ isError: true, message: error?.message });
    }
  };

  return {
    handleGetRequest,
    handlePostRequest,
    handleRemoveRequest,
    handleUpdateRequest,
    handleGetTableDataRequest,
  };
};
