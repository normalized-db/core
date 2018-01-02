# @normalized-db/core

Core-module for related "normalized-db"-libraries providing common models and utility 
functions as well as the `Schema` (implemented with `TypeScript`).

 - **Author**: Sandro Schmid ([saseb.schmid@gmail.com](<mailto:saseb.schmid@gmail.com>))
 - **Version**: 2.3.1

## Notes

 - This library is under active development.
 - To ease versioning equal major and minor version numbers are used for all modules.

## Installation

Install using NPM:

    npm install --save @normalized-db/core

## Usage

Usage is only useful in combination with one of the feature-modules:

 - [normalizer](https://github.com/normalized-db/normalizer): 
    Normalize JS objects

 - [denormalizer](https://github.com/normalized-db/denormalizer): 
    Denormalize JS objects from a normalized data structure

 - [data-store](https://github.com/normalized-db/data-store)
    Persist normalized data-structures, e.g. to `IndexedDB` (JS object-database)

### Schema

Normalization and denormalization both depend on a schema describing the basic data-structure which should be transformed.
A schema is a readonly object which is either created using a `SchemaConfig`-object or the `SchemaBuilder` which internally
also builds a `SchemaConfig`-object. The config object must implement the `ISchemaConfig`-interface.

#### Types

A schema may consist of three different kinds of object-store "types" or "stores" respectively:

 - `_defaults`: Default configuration for every object-store.
 
 - `_[storeName]`: Types prefixed with an underscore are handled as abstract types. The `_defaults`-store is also abstract. 
   These stores can be used if two or more concrete stores share some configurations but no instances are needed.
 
 - `[storeName]`: Concrete stores which either reuse the defaults only, inherit from an abstract store or another
   concrete store. Optionally defines or overrides specific configurations.

If a type only needs the defaults define it by `[storeName]: true`, if it inherits from another store but does not
have an own configuration define it by `[storeName]: "[parentStore]"`. More complex configurations may define the 
following options:

 - `parent` (string): The abstract / concrete type from which this type should inherit predefined configurations.
 
 - [required] `key` (string): The name of a field which contains the unique identifier of this object. The value of this 
   field is used to identify objects of this type. If two objects have the same key they are assumed to be equal.
   The value must be a `ValidKey` (`number`, `string` or `Date`).
 
 - `targets` (string or `IStoreTargetConfig`): This is the most important option for (de)normalization. 
   It defines which field of an object contains an object that should be (de)normalized into/from another type.
   The config value either is a `string` - then it must be the name of an explicitly declared concrete type or it is a
   `IStoreTargetConfig`-object which in return also declares the target type (`type`-option) and optionally the
   `isArray` and `cascadeRemoval` boolean flags.
 
 - `autoKey` (boolean): If set to `true`, this option tells data stores to automatically generate an unique identifier
   for new objects without a key.
   
An example for such a `ISchemaConfig`-object for a simple blog could look like this:

```typescript
const schemaConfig: ISchemaConfig = {
  _defaults: {
    key: 'id',
    autoKey: true
  },
  _authored: {
    targets: {
      author: 'user'
    }
  },
  role: true,
  user: {
    key: 'userName',
    autoKey: false,
    targets: {
      role: 'role'
    }
  },
  article: {
    parent: '_authored',
    targets: {
      comments: {
        type: 'comment',
        isArray: true,
        cascadeRemoval: true
      }
    }
  },
  comment: '_authored'
}
```

A possible input for an array of articles looks like this:

```typescript
const articles: Article[] = [
  {
    id: 1,
    title: 'Title 1',
    author: {
      userName: 'user1',
      email: 'user1@mail.com',
      role: {
        id: 1,
        label: 'role1'
      }
    },
    comments: [
      {
        id: 1,
        text: 'Comment 1',
        author: {
          userName: 'user2',
          email: 'user2@mail.com',
          role: {
            id: 2,
            label: 'role2'
          }
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Title 2',
    author: {
      userName: 'user2',
      email: 'user2@mail.com',
      role: {
        id: 2,
        label: 'role2'
      }
    }
  },
  {
    id: 3,
    title: 'Title 3',
    author: {
      userName: 'user3',
      email: 'user3@mail.com',
      role: {
        id: 3,
        label: 'role3'
      }
    },
    comments: [
      {
        id: 2,
        text: 'Comment 2',
        author: {
          userName: 'user2',
          email: 'user2@mail.com',
          role: {
            id: 2,
            label: 'role2'
          }
        }
      },
      {
        id: 3,
        text: 'Comment 3',
        author: {
          userName: 'user3',
          email: 'user3@mail.com',
          role: {
            id: 3,
            label: 'role3'
          }
        }
      }
    ]
  }
]
```

which then can be normalized using `normalizer.apply('article', articles)`. This will result in:

```typescript
const normalizer = new NormalizerBuilder()
  .withSchemaConfig(schemaConfig)
  .build();

const result = normalizer.apply('article', articles);
console.log(result);

// prints…
const output: NormalizedData = {
  role: [
    {
      id: 1,
      label: 'role1'
    },
    {
      id: 2,
      label: 'role2'
    },
    {
      id: 3,
      label: 'role3'
    }
  ],
  user: [
    {
      userName: 'user1',
      email: 'user1@mail.com',
      role: 1
    },
    {
      userName: 'user2',
      email: 'user2@mail.com',
      role: 2
    },
    {
      userName: 'user3',
      email: 'user3@mail.com',
      role: 3
    }
  ],
  article: [
    {
      id: 1,
      title: 'Title 1',
      author: 'user1',
      comments: [1]
    },
    {
      id: 2,
      title: 'Title 2',
      author: 'user2'
    },
    {
      id: 3,
      title: 'Title 3',
      author: 'user3',
      comments: [2, 3]
    }
  ],
  comment: [
    {
      id: 1,
      text: 'Comment 1',
      author: 2
    },
    {
      id: 2,
      text: 'Comment 2',
      author: 2
    },
    {
      id: 3,
      text: 'Comment 3',
      author: 3
    }
  ]
}
```

#### Design considerations
Note that normalization is not the solution to everything. In fact, in many cases it would absolutely redundant to 
normalize an object. Take the `user.role` from the example above - the roles are basically just a string, the only object
which ever contains a role object is a user and probably it is not possible to edit the role's name. 
In such a case the normalization overhead probably is not worth it. Basically it is recommended to design the schema
rather passive, less can be more, so if normalizing a field is not necessary then do not normalize.
