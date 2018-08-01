import { EventSelection, LogMode } from '../../model';

export interface IStoreLog {
  mode: LogMode;
  eventSelection?: EventSelection;
}
