// services/itemService.ts
import {database} from '../database';
import Item from '../model/Item';

export const findItemByName = async (name: string): Promise<Item | null> => {
  const itemCollection = database.get<Item>('items');
  const results = await itemCollection.query().fetch();
  return results.find(i => i.name === name) || null;
};
