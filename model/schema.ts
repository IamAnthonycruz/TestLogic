import {appSchema, AppSchema, tableSchema} from '@nozbe/watermelondb';
export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'items',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'value', type: 'string'},
      ],
    }),
  ],
});
