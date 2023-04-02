import {StyleSheet, View, TextInput} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import React, {useState} from 'react';
import {COLORS} from '../Utils/theme';

const InputBox = ({handleChange, onSend}) => {
  const [msg, setMsg] = useState('');

  function onChange(e) {
    setMsg(() => e.nativeEvent.text);
    handleChange && handleChange(e);
  }

  function handleSend() {
    onSend && onSend(msg);
    setMsg('');
  }

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        value={msg}
        style={styles.input}
        onChange={e => onChange(e)}
        placeholder="Message"
        placeholderTextColor={'lightgray'}
      />
      <Ionicons
        onPress={() => handleSend()}
        size={20}
        style={styles.send}
        name="ios-send"
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  input: {
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    flex: 1,
    padding: 10,
    marginRight: 10,
    color: COLORS.primary,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  send: {
    color: COLORS.secondary,
    backgroundColor: COLORS.primaryGreen,
    padding: 10,
    borderRadius: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
