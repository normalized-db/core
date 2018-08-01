export enum LogMode {
  Disabled = 0, // disable logging
  Simple = 1, // `LogEntry<?>` except `item`-field
  Full = 2 // include `item`-field
}
