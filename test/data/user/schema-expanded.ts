import { ISchemaExpanded, LogMode } from '../../../lib/index';

export const SCHEMA_EXPANDED: ISchemaExpanded = {
  user: {
    type: 'user',
    key: 'id',
    autoKey: true,
    targets: {
      role: { type: 'role' }
    },
    logging: { mode: LogMode.Disabled }
  },
  role: {
    key: 'id',
    autoKey: true,
    targets: {},
    logging: { mode: LogMode.Disabled },
    type: 'role'
  }
};
