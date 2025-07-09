/** @format */

import { Dimensions } from 'react-native';

export const window = Dimensions.get('screen');
export const getSize = (prct: number) => {
  const height = Dimensions.get('screen').height;
  return parseInt((height * prct).toString(), 10);
};
