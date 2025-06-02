import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {database} from '../database';
import Item from '../model/Item';
const mockFileData = require('../utils/mockFileData.json');

const Main = () => {
  const [items, setItems] = useState<Item[]>([]);

  const loadFileToDB = async () => {
    const itemCollection = database.get<Item>('items');

    await database.write(async () => {
      for (const item of mockFileData) {
        // Optional: Check duplicates here to avoid duplicates
        await itemCollection.create(record => {
          record.name = item.name;
          record.value = item.value;
        });
      }
    });
  };

  const fetchItems = async () => {
    const results = await database.get<Item>('items').query().fetch();
    setItems(results);
  };

  useEffect(() => {
    const setup = async () => {
      await loadFileToDB();
      await fetchItems();
    };

    setup();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={{fontWeight: 'bold', fontSize: 18, margin: 10}}>
          Loaded Items
        </Text>
        {items.map(item => (
          <Text key={item.id} style={{marginLeft: 10}}>
            {item.name} - {item.value}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
