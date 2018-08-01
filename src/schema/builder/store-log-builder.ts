import { EventSelection, LogMode } from '../../model';
import { IStoreLogConfig } from '../model';

export class StoreLogBuilder {

  constructor(private mode?: LogMode,
              private eventSelection?: EventSelection) {
  }

  public setMode(value: LogMode): StoreLogBuilder {
    this.mode = value;
    return this;
  }

  public setEventSelection(value: EventSelection): StoreLogBuilder {
    this.eventSelection = value;
    return this;
  }

  public build(): IStoreLogConfig {
    return {
      mode: this.mode || LogMode.Disabled,
      eventSelection: this.eventSelection
    };
  }
}
