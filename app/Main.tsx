import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
        setSearchId('');
      } else {
        setFoundItem(null);
        setError('Item not found');
      }
    } catch (e) {
      setError('Error fetching item');
      setFoundItem(null);
    }
  };

  return (
    <SafeAreaView style={{padding: 20, flex: 1}}>
      <View
        style={{
          marginVertical: 40,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TextInput
          placeholder="Enter ID name"
          value={searchId}
          onChangeText={setSearchId}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 20,
            width: '90%',
          }}
        />
        <TouchableOpacity style={styles.button} onPress={searchItemById}>
          <Text style={{color: 'white'}}>Search ID</Text>
        </TouchableOpacity>
      </View>

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
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
            Results:
          </Text>
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: 'black',
              padding: 20,
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 15}}>ID: {foundItem.id}</Text>
            {showName && (
              <Text style={{fontSize: 15}}>Name: {foundItem.name}</Text>
            )}
            {showValue && (
              <Text style={{fontSize: 15}}>Value: {foundItem.value}</Text>
            )}
          </View>
        </View>
      )}

      {!!error && <Text style={{marginTop: 20, color: 'red'}}>{error}</Text>}
    </SafeAreaView>
  );
};

export default Main;
const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    padding: 10,
    backgroundColor: 'red',
  },
});
