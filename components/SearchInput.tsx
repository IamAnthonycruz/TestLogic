import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

type SearchInputProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  disabled: boolean;
};
const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled,
}) => {
  return (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}>
      <TextInput
        placeholder="Enter ID Name"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.input}
        returnKeyType="search"
      />
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={disabled}>
        <Text style={{color: 'white'}}>Search ID</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: '95%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    padding: 10,
    backgroundColor: 'red',
    width: '40%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#aaa',
  },
});

export default SearchInput;
