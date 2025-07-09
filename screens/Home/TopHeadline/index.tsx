/** @format */

import { useGetQuery } from '@/hooks/useGetQuery';
import { NewsType } from '@/utils/types';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { isArray } from 'lodash';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useRouter } from 'expo-router';
import { getSize, window } from '@/constants/sizes';
import { constant } from '@/constants/configVariable';

const PopularMovies = () => {
  const progress = useSharedValue<number>(0);
  const router = useRouter();
  const { data } = useGetQuery<{
    status: string;
    totalResults: number;
    articles: NewsType[];
  } | null>('top-headlines', {
    params: {
      country: 'us',
      apiKey: constant.API_KEY,
    },
  });
  return (
    <View
      id='carousel-component'
      className='w-full items-center '>
      <Carousel
        autoPlayInterval={2000}
        data={isArray(data?.articles) ? data?.articles : []}
        height={getSize(0.37)}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={window.width}
        mode='parallax'
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: getSize(0.13),
        }}
        onProgressChange={progress}
        renderItem={({ item }) => {
          return (
            <ImageBackground
              source={{
                uri: item?.urlToImage,
              }}
              resizeMode='cover'
              className='h-full  bg-gray-500 justify-center items-center relative'
              style={[styles.card]}>
              <TouchableOpacity
                onPress={() => {}}
                className='rounded-full w-40 h-40 bg-white/50 justify-center items-center'>
                <AntDesign
                  name='question'
                  size={getSize(0.07)}
                />
              </TouchableOpacity>
              <View className='absolute bottom-4'>
                <Text
                  className='text-white text-2xl font-extrabold px-4 text-center'
                  numberOfLines={2}
                  ellipsizeMode='tail'>
                  {item?.title}
                </Text>
                <Text
                  className='text-white text-sm font-semibold px-4 text-center'
                  numberOfLines={2}
                  ellipsizeMode='tail'>
                  {moment(item?.publishedAt).format('MMM DD, YYYY')}
                </Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    elevation: 5,
    overflow: 'hidden',
    marginHorizontal: getSize(0.05),
  },
  text: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '600',
  },
});

export default React.memo(PopularMovies);
