import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../Utils/theme';

const HeaderSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSearchIconClick = () => {
    setIsSearching(!isSearching);
    Animated.timing(slideAnim, {
      toValue: isSearching ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0], // Adjust the value based on the desired animation distance
  });

  const slideStyle = {transform: [{translateY: slideInterpolation}]};

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleSearchIconClick();
          //   onSearch && onSearch(isSearching);
        }}>
        <MaterialIcons
          size={25}
          color={COLORS.secondary}
          // style={{
          //   marginRight: 10,
          // }}
          name="search"
        />
      </TouchableOpacity>
      {isSearching && (
        <Animated.View
          style={[
            {position: 'absolute', top: 0, left: 0, right: 0, width: '100%'},
            slideStyle,
          ]}>
          <TextInput
            placeholder="Search..."
            style={{
              borderWidth: 1,
              borderColor: COLORS.secondary,
              borderRadius: 5,
              padding: 10,
              width: '100%',
            }}
          />
        </Animated.View>
      )}
    </>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({});
