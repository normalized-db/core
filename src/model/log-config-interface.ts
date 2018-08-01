import { IStoreLogConfig } from '../schema/model/store-log-config-interface';
import { EventType, LogMode } from './index';

export interface ILogConfig {

  getConfig(type: string, orDefault?: IStoreLogConfig): IStoreLogConfig;

  getLogMode(type: string, orDefault?: LogMode): LogMode;

  getEventTypes(type: string, orDefault?: EventType[]): EventType[];

  isLoggingEnabled(type: string, eventType?: EventType): boolean;
}
