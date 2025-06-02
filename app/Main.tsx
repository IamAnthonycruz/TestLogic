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
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Item from '../model/Item';
import {findItemByName} from '../services/itemService';

const Main = () => {
  const [searchId, setSearchId] = useState('');
  const [foundItem, setFoundItem] = useState<Item | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState(false);
  const [showName, setShowName] = useState(true);
  const [showValue, setShowValue] = useState(true);

  const reset = () => {
    setSearchId('');
    setError('');
    setFilter(false);
    setShowName(true);
    setShowValue(true);
  };
  const searchItemById = async () => {
    setError('');
    Keyboard.dismiss();

    try {
      const item = await findItemByName(searchId.trim());

      if (item) {
        setFoundItem(item);
        reset();
      } else {
        setFoundItem(null);
        Alert.alert('Error', 'Item not found, try again');
        setSearchId('');
      }
    } catch (e) {
      setError('Error fetching item');
      setFoundItem(null);
      setSearchId('');
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
          onSubmitEditing={() => {
            if (searchId.trim()) searchItemById();
          }}
          returnKeyType="search"
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, !searchId.trim() && styles.buttonDisabled]}
          onPress={searchItemById}
          disabled={!searchId.trim()}>
          <Text style={{color: 'white'}}>Search ID</Text>
        </TouchableOpacity>
      </View>

      {foundItem && (
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={() => setFilter(!filter)}>
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {filter && foundItem && (
        <View style={{marginTop: 20}}>
          <Text style={styles.filterHeader}>Select Fields to Show:</Text>

          <View style={styles.checkboxRow}>
            <CheckBox value={showName} onValueChange={setShowName} />
            <Text style={styles.checkboxLabel}>Name</Text>
          </View>

          <View style={styles.checkboxRow}>
            <CheckBox value={showValue} onValueChange={setShowValue} />
            <Text style={styles.checkboxLabel}>Value</Text>
          </View>
        </View>
      )}

      {foundItem && (
        <View>
          <Text style={styles.resultHeader}>Results:</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>ID: {foundItem.id}</Text>
            {showName && (
              <Text style={styles.resultText}>Name: {foundItem.name}</Text>
            )}
            {showValue && (
              <Text style={styles.resultText}>Value: {foundItem.value}</Text>
            )}
          </View>
        </View>
      )}

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: '90%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    padding: 10,
    backgroundColor: 'red',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#aaa',
  },
  filterText: {
    textAlign: 'right',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  resultHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  resultBox: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 15,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
});
