import { isNull } from '../../utility/object';
import { IStoreConfig } from '../models/store-config-interface';
import { IStoreTargetConfig } from '../models/store-target-config-interface';
import { IStoreTargetItem } from '../models/store-target-item-interface';

export class StoreBuilder {

  constructor(private parent?: string,
              private key?: string,
              private lastModified?: string,
              private autoKey?: boolean,
              private targets?: IStoreTargetConfig) {
  }

  public setKey(key: string): StoreBuilder {
    this.key = key;
    return this;
  }

  public setLastModified(lastModified: string): StoreBuilder {
    this.lastModified = lastModified;
    return this;
  }

  public setAutoKey(autoKey: boolean): StoreBuilder {
    this.autoKey = autoKey;
    return this;
  }

  public setParent(parent: string): StoreBuilder {
    this.parent = parent;
    return this;
  }

  public hasTarget(field: string): boolean {
    return field in this.targets;
  }

  public setTarget(field: string, type: string, cascadeRemoval: boolean = false): StoreBuilder {
    const config: IStoreTargetItem = { type: type };

    if (cascadeRemoval) {
      config.cascadeRemoval = true;
    }

    if (this.targets) {
      this.targets[field] = config;
    } else {
      this.targets = { [field]: config };
    }

    return this;
  }

  public setArrayTarget(field: string, type: string, cascadeRemoval: boolean = false): StoreBuilder {
    this.setTarget(field, type, cascadeRemoval);
    (this.targets[field] as IStoreTargetItem).isArray = true;

    return this;
  }

  public removeTarget(field: string): StoreBuilder {
    if (this.hasTarget(field)) {
      delete this.targets[field];
    }

    return this;
  }

  public get build(): boolean | string | IStoreConfig {
    if (this.hasConfiguration) {
      const result: IStoreConfig = {};
      if (this.key) {
        result.key = this.key;
      }

      if (!isNull(this.autoKey)) {
        result.autoKey = this.autoKey;
      }

      if (this.parent) {
        result.parent = this.parent;
      }

      if (this.targets) {
        result.targets = this.targets;
      }

      return result;

    } else if (this.parent) {
      return this.parent;

    } else {
      return true;
    }
  }

  private get hasConfiguration(): boolean {
    return !isNull(this.key) || !isNull(this.autoKey) || this.hasTargets;
  }

  private get hasTargets(): boolean {
    return !isNull(this.targets) && Object.keys(this.targets).length > 0;
  }
}
