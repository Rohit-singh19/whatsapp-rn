import {Text} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';

const Badge = ({counter, color}) => {
  return <Text style={{color: color || COLORS.primaryGreen}}>{counter}</Text>;
};

export default Badge;
