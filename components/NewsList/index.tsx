/** @format */

import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { isArray } from 'lodash';
import { NewsType } from '@/utils/types';
import { useGetQuery } from '@/hooks/useGetQuery';
import { useRouter } from 'expo-router';
import { constant } from '@/constants/configVariable';

type props = {
  title: string;
  link: string;
  params: Record<string, any>;
};
const MovieLists: React.FC<props> = ({ title, link, params = {} }) => {
  const { data } = useGetQuery<{
    articles: NewsType[];
  } | null>(link, {
    params: {
      ...params,
      apiKey: constant.API_KEY,
    },
  });
  const router = useRouter();
  return (
    <View className='gap-2 mt-4'>
      <Text className='text-white text-2xl font-extrabold px-4 mb-2'>
        {title}
      </Text>
      <FlatList
        data={isArray(data?.articles) ? data?.articles : []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className='w-36 gap-3'
              onPress={() => {}}>
              <Image
                resizeMode='cover'
                source={{ uri: item.urlToImage }}
                className='rounded-lg w-36 h-40 overflow-hidden'
              />
              <Text
                className='text-white text-sm font-extrabold   text-center'
                numberOfLines={3}
                ellipsizeMode='tail'>
                {item?.title}
              </Text>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View className='mr-2'></View>}
      />
    </View>
  );
};

export default React.memo(MovieLists);
