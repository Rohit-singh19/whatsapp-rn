import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Message from '../Components/Message';
import {chatMsg} from '../modals/chat';
import {bg} from '../assets/images';
import InputBox from '../Components/InputBox';

const ChatScreen = () => {
  function handleChange() {
    console.log('value');
  }
  function onSend(msg) {
    console.log('msg =>', msg);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={[styles.bg]}>
      <ImageBackground source={bg} style={[styles.bg]}>
        <FlatList
          data={chatMsg}
          renderItem={({item}) => <Message {...item} />}
          keyExtractor={item => item?.id}
          inverted
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={{paddingBottom: 20}}
        />
        <InputBox onChange={handleChange} onSend={onSend} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
