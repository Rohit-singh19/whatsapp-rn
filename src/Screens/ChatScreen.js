import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {bg} from '../assets/images';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {COLORS} from '../Utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const userDetails = useSelector(state => state.userReducer);

  console.log('userDetails:::', userDetails);
  function handleChange() {
    console.log('value');
  }
  // function onSend(msg) {
  //   console.log('msg =>', msg);
  // }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  const renderSend = props => (
    <View style={[styles.sendBtn]}>
      <Send {...props}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            height: '100%',
          }}>
          <FontAwesome
            style={{
              backgroundColor: COLORS.primaryGreen,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 20,
              alignItems: 'center',
            }}
            name="send"
            size={20}
            color={COLORS.secondary}
          />
        </View>
      </Send>
    </View>
  );

  const renderBubble = props => (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: COLORS.jetBlack,
        },
        left: {
          color: COLORS.jetBlack,
        },
      }}
      wrapperStyle={{
        left: [styles.msgContainer, {backgroundColor: COLORS.secondary}],
        right: [styles.msgContainer, {backgroundColor: COLORS.msgColor}],
      }}
    />
  );

  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
      }}
    />
  );

  const renderComposer = props => (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        multiline={props.multiline || true}
        onChangeText={props.onTextChanged}
        value={props.text}
        selectionColor={COLORS.primaryGreen}
        style={{
          maxWidth: '90%',
        }}
      />
      <View style={styles.actionContainer}>
        <TouchableOpacity>
          <FontAwesome name="camera" color={COLORS.gray} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={[styles.bg]}>
      <ImageBackground source={bg} style={[styles.bg]}>
        <GiftedChat
          alwaysShowSend
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          // customise
          placeholder="Message"
          renderSend={renderSend}
          renderAvatar={() => null}
          renderBubble={renderBubble}
          renderComposer={renderComposer}
          renderInputToolbar={renderInputToolbar}
        />
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
  msgContainer: {
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',

    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  sendBtn: {
    backgroundColor: 'transparent',
    height: '100%',
    marginRight: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,

    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  actionContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
