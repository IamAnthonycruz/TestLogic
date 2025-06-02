import React, {useState, useEffect} from 'react';
import {SafeAreaView, TextInput, Button, Text, View, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {LOAD_FILE_REQUEST} from '../redux/actions';
import {database} from '../database';
import Item from '../model/Item';

const Main = () => {
  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState('');
  const [foundItem, setFoundItem] = useState<Item | null>(null);
  const [error, setError] = useState('');

  const [showName, setShowName] = useState(true);
  const [showValue, setShowValue] = useState(true);

  useEffect(() => {
    dispatch({type: LOAD_FILE_REQUEST});
  }, [dispatch]);

  const searchItemById = async () => {
    setError('');
    try {
      const itemCollection = database.get<Item>('items');
      const results = await itemCollection.query().fetch();

      const item = results.find(i => i.name === searchId);

      if (item) {
        setFoundItem(item);
      } else {
        setFoundItem(null);
        setError('Item not found');
      }
    } catch (e) {
      setError('Error fetching item');
      setFoundItem(null);
    }
  };

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
    <SafeAreaView style={{padding: 20}}>
      <TextInput
        placeholder="Enter item name"
        value={searchId}
        onChangeText={setSearchId}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
        }}
      />
      <Button title="Search" onPress={searchItemById} />

      {foundItem && (
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>
            Select Fields to Show:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <CheckBox value={showName} onValueChange={setShowName} />
            <Text style={{marginLeft: 8}}>Name</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <CheckBox value={showValue} onValueChange={setShowValue} />
            <Text style={{marginLeft: 8}}>Value</Text>
          </View>
        </View>
      )}

      {foundItem && (
        <View style={{marginTop: 20}}>
          <Text>ID: {foundItem.id}</Text>
          {showName && <Text>Name: {foundItem.name}</Text>}
          {showValue && <Text>Value: {foundItem.value}</Text>}
        </View>
      )}

      {!!error && <Text style={{marginTop: 20, color: 'red'}}>{error}</Text>}

      <View style={{marginTop: 30}}>
        <Button title="Clear Database" color="red" onPress={clearDatabase} />
      </View>
    </SafeAreaView>
  );
};

export default Main;
