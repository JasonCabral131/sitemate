/** @format */

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useCallback } from 'react';
import moment from 'moment';
import TopHeadline from './TopHeadline';
import { useRouter } from 'expo-router';
import NewsList from '@/components/NewsList';
const window = Dimensions.get('window');
const Main = () => {
  const router = useRouter();

  const generateGreetings = useCallback(() => {
    const currentHour = parseInt(moment().format('HH'), 10);

    if (currentHour >= 1 && currentHour < 12) {
      return {
        title: 'Good Morning ☀️',
        description:
          'Catch up on the latest headlines to start your day informed.',
      };
    } else if (currentHour >= 12 && currentHour < 18) {
      return {
        title: 'Good Afternoon 📰',
        description: 'Stay updated with today’s top news stories.',
      };
    } else if (currentHour >= 18 && currentHour < 24) {
      return {
        title: 'Good Evening 🌙',
        description: 'Unwind and review the day’s biggest news highlights.',
      };
    } else {
      return {
        title: 'Hello 👋',
        description: 'Stay informed with the latest news anytime.',
      };
    }
  }, []);

  return (
    <View className='flex-1 '>
      <View className='px-4 pb-8'>
        <View className='flex-row justify-between items-center '>
          <Text className='text-white font-bold text-3xl'>Sitemate</Text>
        </View>
        <TextInput
          numberOfLines={1}
          placeholder='Search'
          style={styles.search}
          className='mt-4'
          onPress={() => router.push('/search')}
        />
        <View className='mt-4'>
          <Text className='text-white font-extrabold text-xl'>
            {generateGreetings().title}
          </Text>
          <Text className='text-white font-semibold text-lg mt-1'>
            {generateGreetings().description}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className='pb-5'>
          <TopHeadline />

          <NewsList
            link={'top-headlines'}
            title='Sports'
            params={{
              country: 'us',
              category: 'sports',
            }}
          />
          <NewsList
            link={'top-headlines'}
            title='Entertainment'
            params={{
              country: 'us',
              category: 'entertainment',
            }}
          />
          <NewsList
            link={'top-headlines'}
            title='Technology'
            params={{
              country: 'us',
              category: 'technology',
            }}
          />
          <NewsList
            link={'top-headlines'}
            title='Health'
            params={{
              country: 'us',
              category: 'health',
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default React.memo(Main);
