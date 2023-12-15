import { IRootModel } from "./root-model";

export interface ILogActivityModel extends IRootModel {
  logActivityId: string;
  logActivityCreatedBy: string;
  logActivityMessage: string;
  logActivitySemesterId: string;
  logActivityType: "info" | "warning" | "error";
}
