import { ISchemaConfig, LogMode } from '../../../lib/index';

export const SCHEMA: ISchemaConfig = {
  _defaults: {
    key: 'id',
    autoKey: true
  },
  _authored: {
    targets: {
      author: 'user'
    },
    logging: {
      mode: LogMode.Simple
    }
  },
  role: true,
  user: {
    key: 'userName',
    targets: {
      role: 'role'
    },
    logging: {
      mode: LogMode.Disabled,
      eventSelection: 'created'
    }
  },
  article: {
    parent: '_authored',
    targets: {
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
  comment: '_authored'
};
