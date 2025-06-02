// ResultDisplay.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Item from '../model/Item';

interface ResultDisplayProps {
  item: Item;
  showName: boolean;
  showValue: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  item,
  showName,
  showValue,
}) => {
  return (
    <View>
      <Text style={styles.resultHeader}>Results:</Text>
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>ID: {item.id}</Text>
        {showName && <Text style={styles.resultText}>Name: {item.name}</Text>}
        {showValue && (
          <Text style={styles.resultText}>Value: {item.value}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ResultDisplay;
