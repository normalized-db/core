import { ValidKey } from '../model/valid-key';

export class RefsUtility {

  public static has(item: any, type: string) {
    return '_refs' in item && type in item._refs && item._refs[type].size > 0;
  }

  public static hasKey(item: any, type: string, key: ValidKey) {
    return this.has(item, type) && item._refs[type].has(key);
  }

  public static iterator(item: any, type: string): Iterator<ValidKey> {
    return this.has(item, type) ? item._refs[type].values() : {
      next: () => {
        return { done: true };
      }
    };
  }

  public static getAll<Key extends ValidKey>(item: any, type: string): ValidKey[] {
    return this.has(item, type) ? (Array.from(item._refs[type]) as Array<Key>) : [];
  }

  public static first<Key extends ValidKey>(item: any, type: string): ValidKey | null {
    return this.has(item, type) ? (item._refs[type].values().next().value) as Key : null;
  }
}
