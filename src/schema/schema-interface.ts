import { IStore } from './models/store-interface';
import { IStoreTargetItem } from './models/store-target-item-interface';

export interface ISchema {
  hasType(type: string): boolean;
  getTypes(): string[];
  getConfig(type: string): IStore;
  getTargetItem(type: string, field): IStoreTargetItem;
  getTargetConfig(type: string, field: string): IStore;
  toString(): string;
}
