import { ISchemaExpanded, LogMode } from '../../../lib/index';

export const SCHEMA_EXPANDED: ISchemaExpanded = {
  role: {
    key: 'id',
    autoKey: true,
    targets: {},
    logging: { mode: LogMode.Disabled },
    type: 'role'
  },
  user: {
    type: 'user',
    key: 'userName',
    autoKey: true,
    targets: {
      role: { type: 'role' }
    },
    logging: {
      mode: LogMode.Disabled,
      eventSelection: 'created'
    }
  },
  article: {
    type: 'article',
    key: 'id',
    autoKey: true,
    targets: {
      author: { type: 'user' },
      comments: {
        type: 'comment',
        cascadeRemoval: true,
        isArray: true
      }
    },
    logging: {
      mode: LogMode.Full,
      eventSelection: ['created', 'updated', 'removed']
    }
  },
  comment: {
    type: 'comment',
    key: 'id',
    autoKey: true,
    targets: {
      author: { type: 'user' }
    },
    logging: {
      mode: LogMode.Simple
    }
  }
};
