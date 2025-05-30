import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {mySchema} from '../model/schema';
import Item from '../model/Item';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  dbName: 'MyAppDB',

  onSetUpError: error => console.log(error),
});

export const database = new Database({
  adapter,
  modelClasses: [Item],
});
