import { ISchemaExpanded } from '../../../lib/index';

export const SCHEMA_EXPANDED: ISchemaExpanded = {
  user: {
    type: 'user',
    key: 'id',
    autoKey: true,
    targets: {
      role: { type: 'role' }
    }
  },
  role: {
    key: 'id',
    autoKey: true,
    targets: {},
    type: 'role'
  }
};
