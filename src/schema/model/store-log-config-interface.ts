import { EventSelection, LogMode } from '../../model';

export interface IStoreLogConfig {
  mode: LogMode;
  eventSelection?: EventSelection;
}
