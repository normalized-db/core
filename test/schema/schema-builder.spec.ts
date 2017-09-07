import { assert } from 'chai';
import { Schema, SchemaBuilder } from '../../lib/index';

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
      .setTarget('author', 'user');

    schemaBuilder.setStore('role');

    schemaBuilder.setStore('user')
      .setKey('userName')
      .setTarget('role', 'role');

    schemaBuilder.setStore('article', '_authored')
      .setArrayTarget('comments', 'comment', true);

    schemaBuilder.setStore('comment', '_authored');

    test(schemaBuilder, Blog.SCHEMA_EXPANDED);
  });
});
