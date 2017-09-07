import { ISchemaExpanded } from '../../../lib/index';

export const SCHEMA_EXPANDED: ISchemaExpanded = {
  role: {
    key: 'id',
    autoKey: true,
    targets: {},
    type: 'role'
  },
  user: {
    type: 'user',
    key: 'userName',
    autoKey: true,
    targets: {
      role: { type: 'role' }
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
    }
  },
  comment: {
    type: 'comment',
    key: 'id',
    autoKey: true,
    targets: {
      author: { type: 'user' }
    }
  }
};
