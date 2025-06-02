import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Item from '../model/Item';
import {findItemByName} from '../services/itemService';
import SearchInput from '../components/SearchInput';
import FiltersPanel from '../components/FilterPanel';
import ResultDisplay from '../components/ResultDisplay';

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
      <SearchInput
        value={searchId}
        onChange={setSearchId}
        onSubmit={searchItemById}
        disabled={!searchId.trim()}
      />

      {foundItem && (
        <View style={styles.textFilter}>
          <TouchableOpacity onPress={() => setFilter(!filter)}>
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {filter && foundItem && (
        <FiltersPanel
          showName={showName}
          showValue={showValue}
          onToggleShowName={() => setShowName(showName)}
          onToggleShowValue={() => setShowValue(showValue)}
        />
      )}

      {foundItem && (
        <ResultDisplay
          item={foundItem}
          showName={showName}
          showValue={showValue}
        />
      )}

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
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

  errorText: {
    marginTop: 20,
    color: 'red',
  },
  textFilter: {
    marginTop: 10,
  },
});
