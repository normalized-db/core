import { IStoreTargetConfig } from './store-target-config-interface';

export interface IStoreConfig {
  parent?: string;
  key?: string;
  lastModified?: string;
  autoKey?: boolean;
  targets?: IStoreTargetConfig;
}
