/** @format */

import React, { useState } from 'react';
import { View, Text, Image, Pressable, Linking, Alert } from 'react-native';
import { NewsType } from '@/utils/types';
import moment from 'moment';

interface ArticleCardProps {
  article: NewsType;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    if (article.url) {
      Alert.alert('Out of time');
    }
  };

  const formatDate = (dateString: string) => {
    return moment(dateString).format('MMM DD, YYYY');
  };

  return (
    <Pressable
      onPress={handlePress}
      className='bg-white rounded-xl mx-4 mb-4 overflow-hidden'
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}>
      {article.urlToImage && !imageError ? (
        <Image
          source={{ uri: article.urlToImage }}
          className='w-full h-48'
          resizeMode='cover'
          onError={() => setImageError(true)}
        />
      ) : (
        <View className='w-full h-48 bg-gray-200 justify-center items-center'>
          <Text className='text-gray-400 text-lg'>📰</Text>
        </View>
      )}

      <View className='p-4'>
        <Text
          className='text-lg font-bold text-gray-800 mb-2'
          numberOfLines={2}>
          {article.title}
        </Text>

        {article.description && (
          <Text
            className='text-gray-600 mb-3'
            numberOfLines={3}>
            {article.description}
          </Text>
        )}

        <View className='flex-row justify-between items-center'>
          <Text className='text-sm text-blue-600 font-medium'>
            {article.source.name}
          </Text>
          <Text className='text-sm text-gray-400'>
            {formatDate(article.publishedAt)}
          </Text>
        </View>

        {article.author && (
          <Text className='text-xs text-gray-500 mt-1'>
            By {article.author}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default ArticleCard;
