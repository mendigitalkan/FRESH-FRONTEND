import { TextInput } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { converDateTimeFromDB } from "../../utils/convert";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";
import { ILogActivityModel } from "../../models/log-activitiy";
import { convertTime } from "../../utils/convertTime";

const LogActivityListView = () => {
  const [listLogBook, setListLogBook] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser }: AppContextTypes = useAppContext();
  const navigate = useNavigate();
  const { handleGetTableDataRequest } = useHttp();

  const fecthData = async () => {
    const result = await handleGetTableDataRequest({
      path: apiUrlPath.logActivities.get,
    });

    setListLogBook({
      link: apiUrlPath.logActivities.get,
      data: result,
      page: 0,
      size: 10,
      filter: {
        search: "",
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fecthData();
  }, []);

  const header: TableHeader[] = [
    {
      title: "No",
      data: (data: ILogActivityModel, index: number): ReactElement => (
        <td key={index + "-no"} className="md:px-6 md:py-3 break-all">
          {index + 1}
        </td>
      ),
    },

    {
      title: "Pengguna",
      data: (data: ILogActivityModel, index: number): ReactElement => (
        <td key={index + "pengguna"} className="md:px-6 md:py-3 break-all">
          {data.logActivityCreatedBy}
        </td>
      ),
    },

    {
      title: "Tipe",
      data: (data: ILogActivityModel, index: number): ReactElement => {
        if (data.logActivityType === "error") {
          return (
            <td key={index + "pesan"} className="md:px-6 md:py-3">
              <span className="bg-red-200 text-red-600 py-1 px-5 rounded-full text-xs">
                {data.logActivityType}
              </span>
            </td>
          );
        }

        if (data.logActivityType === "warning") {
          return (
            <td key={index + "pesan"} className="md:px-6 md:py-3">
              <span className="bg-yellow-200 text-yellow-600 py-1 px-5 rounded-full text-xs">
                {data.logActivityType}
              </span>
            </td>
          );
        }

        return (
          <td key={index + "pesan"} className="md:px-6 md:py-3">
            <span className="bg-green-200 text-green-600 py-1 px-5 rounded-full text-xs">
              {data.logActivityType}
            </span>
          </td>
        );
      },
    },

    {
      title: "pesan",
      data: (data: ILogActivityModel, index: number): ReactElement => (
        <td key={index + "pesan"} className="md:px-6 md:py-3 break-all">
          {data.logActivityMessage}
        </td>
      ),
    },
    {
      title: "dibuat pada",
      data: (data: ILogActivityModel, index: number): ReactElement => (
        <td key={index + "pesan"} className="md:px-6 md:py-3 break-all">
          {convertTime(data.createdOn)}
        </td>
      ),
    },
  ];

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: "/log-activities",
            title: "Log Activity",
          },
          {
            link: "/log-activities",
            title: "List",
          },
        ]}
        icon={BASE_ICON.MENU.MbkmSummaryIcon}
      />
      <h1 className="mb-5">Tabel Log Aktivitas</h1>
      <div className="flex flex-col md:flex-row justify-between md:px-0">
        <div className="flex items-center">
          <div className="w-full mr-2 flex flex-row justify-between md:justify-start">
            <select
              name="size"
              defaultValue={10}
              className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            >
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="mt-1 w-full md:w-1/5">
          <TextInput type="text" placeholder="search..." />
        </div>
      </div>
      <TableStyle header={header} table={listLogBook} />
    </div>
  );
};

export default LogActivityListView;
