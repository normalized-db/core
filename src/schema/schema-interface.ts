import { IStore } from './model/store-interface';
import { IStoreTargetItem } from './model/store-target-item-interface';

export interface ISchema {
  hasType(type: string): boolean;
  getTypes(): string[];
  getConfig(type: string): IStore;
  getTargetItem(type: string, field): IStoreTargetItem;
  getTargetConfig(type: string, field: string): IStore;
  toString(): string;
}
