/** @format */

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
}) => {
  return (
    <View className='flex-1 justify-center items-center px-4'>
      <ActivityIndicator
        size='large'
        color='#3B82F6'
      />
      <Text className='text-gray-600 mt-4 text-center'>{message}</Text>
    </View>
  );
};

export default LoadingState;
