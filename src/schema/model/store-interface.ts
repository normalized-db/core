import { IStoreTarget } from './store-target-interface';

export interface IStore {
  type: string;
  key?: string;
  autoKey?: boolean;
  targets?: IStoreTarget;
}
