import { EmployeeModel } from './EmployeeModel';

export type HistoricalModel = {
  id: string;
  leader: EmployeeModel;
  led: EmployeeModel;
  occurrence: Date;
  commentary: string;
};