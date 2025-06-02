import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';

interface FiltersPanelProps {
  showName: boolean;
  showValue: boolean;
  onToggleShowName: (newValue: boolean) => void;
  onToggleShowValue: (newValue: boolean) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  showName,
  showValue,
  onToggleShowName,
  onToggleShowValue,
}) => {
  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.filterHeader}>Select Fields to Show:</Text>

      <View style={styles.checkboxRow}>
        <CheckBox value={showName} onValueChange={onToggleShowName} />
        <Text style={styles.checkboxLabel}>Name</Text>
      </View>

      <View style={styles.checkboxRow}>
        <CheckBox value={showValue} onValueChange={onToggleShowValue} />
        <Text style={styles.checkboxLabel}>Value</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default FiltersPanel;
