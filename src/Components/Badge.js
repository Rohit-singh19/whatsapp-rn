import {Text} from 'react-native';
import React from 'react';
import {COLORS} from '../Utils/theme';

const Badge = ({coutner}) => {
  return <Text style={{color: COLORS.primaryGreen}}>{coutner}</Text>;
};

export default Badge;
