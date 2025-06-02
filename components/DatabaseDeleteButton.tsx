import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {database} from '../database';
import Item from '../model/Item';

const DatabaseDeleteButton = () => {
  const [searchId, setSearchId] = useState('');
  const [foundItem, setFoundItem] = useState<Item | null>(null);
  const [error, setError] = useState('');

  const [showName, setShowName] = useState(true);
  const [showValue, setShowValue] = useState(true);
  const clearDatabase = async () => {
    try {
      const itemCollection = database.get<Item>('items');
      const allItems = await itemCollection.query().fetch();

      await database.write(async () => {
        for (const item of allItems) {
          await item.markAsDeleted();
          await item.destroyPermanently();
        }
      });

      setFoundItem(null);
      setSearchId('');
      setError('');
      Alert.alert('Success', 'Database cleared successfully');
      console.log('✅ All items deleted');
    } catch (e) {
      console.error('❌ Error clearing DB:', e);
      Alert.alert('Error', 'Failed to clear database');
    }
  };
  return (
    <View style={{marginTop: 30}}>
      <Button title="Clear Database" color="red" onPress={clearDatabase} />
    </View>
  );
};

export default DatabaseDeleteButton;

const styles = StyleSheet.create({});
