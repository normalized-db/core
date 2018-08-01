import { assert } from 'chai';
import { LogMode, Schema, SchemaBuilder, StoreLogBuilder } from '../../lib/index';

import * as Blog from '../data/blog-post';
import * as User from '../data/user';

describe('Schema-Builder', function () {

  function test(schemaBuilder: SchemaBuilder, expectedResult: any) {
    const schemaJSON = new Schema(schemaBuilder.build).toString();
    const expectedJSON = JSON.stringify(expectedResult);
    assert.strictEqual(schemaJSON, expectedJSON);
  }

  it('User', function () {
    const schemaBuilder = new SchemaBuilder()
        .setDefaultKey('id')
        .setDefaultAutoKey(true);

    schemaBuilder.setStore('user')
        .setTarget('role', 'role');

    schemaBuilder.setStore('role');

    test(schemaBuilder, User.SCHEMA_EXPANDED);
  });

  it('Blog Posts', function () {
    const schemaBuilder = new SchemaBuilder()
        .setDefaultKey('id')
        .setDefaultAutoKey(true);

    schemaBuilder.setAbstractStore('authored')
        .setTarget('author', 'user')
        .setLogging(new StoreLogBuilder(LogMode.Simple).build());

    schemaBuilder.setStore('role');

    const userLogConfig = new StoreLogBuilder()
        .setMode(LogMode.Disabled)
        .setEventSelection( 'created')
        .addKey([1, 2])
        .build();

    schemaBuilder.setStore('user')
        .setKey('userName')
        .setTarget('role', 'role')
        .setLogging(userLogConfig);

    const articleLogConfig = new StoreLogBuilder()
        .setMode(LogMode.Full)
        .setEventSelection(['created', 'updated', 'removed'])
        .build();

    schemaBuilder.setStore('article', '_authored')
        .setArrayTarget('comments', 'comment', true)
        .setLogging(articleLogConfig);

    schemaBuilder.setStore('comment', '_authored');

    test(schemaBuilder, Blog.SCHEMA_EXPANDED);
  });
});
