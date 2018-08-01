export enum LogMode {
  Disabled = 'disabled', // disable logging
  Simple = 'simple', // `LogEntry<?>` except `item`-field
  Full = 'full' // include `item`-field
}
