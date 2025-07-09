/** @format */

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSearchArticles } from '@/hooks/useSearchArticles';
import ArticleCard from '@/components/ArticleCard';
import LoadingState from '@/components/LoadingState';
import { NewsType } from '@/utils/types';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SearchApp = () => {
  const {
    articles,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    totalResults,
  } = useSearchArticles();

  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();

  const onRefresh = React.useCallback(() => {
    if (searchQuery.trim()) {
      setRefreshing(true);
      // Trigger a new search by updating the query
      setSearchQuery(searchQuery.trim());
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [searchQuery, setSearchQuery]);

  const renderArticle = ({ item }: { item: NewsType }) => (
    <ArticleCard article={item} />
  );

  const renderEmptyState = () => {
    if (loading && searchQuery.trim()) {
      return <LoadingState message={`Searching for "${searchQuery}"...`} />;
    }

    if (!searchQuery.trim()) {
      return (
        <View className='flex-1 justify-center items-center px-4'>
          <Text className='text-gray-500 text-lg text-center'>
            Start typing to search for news articles
          </Text>
          <Text className='text-gray-400 text-sm text-center mt-2'>
            Powered by NewsAPI
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className='flex-1 justify-center items-center px-4'>
          <Text className='text-red-500 text-lg text-center mb-2'>
            Something went wrong
          </Text>
          <Text className='text-gray-500 text-center'>{error}</Text>
        </View>
      );
    }

    if (articles.length === 0) {
      return (
        <View className='flex-1 justify-center items-center px-4'>
          <Text className='text-gray-500 text-lg text-center'>
            No articles found for "{searchQuery}"
          </Text>
          <Text className='text-gray-400 text-sm text-center mt-2'>
            Try different keywords
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View>
      <View className='px-4 pb-4'>
        <View className='flex-row gap-2 mb-4 items-center'>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather
              name='arrow-left'
              color={'#fff'}
              size={20}
            />
          </TouchableOpacity>
          <Text className='text-white font-bold text-3xl'>Sitemate</Text>
        </View>

        <View className='relative'>
          <TextInput
            numberOfLines={1}
            placeholder='Search for news articles...'
            style={styles.search}
            className='mt-4'
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize='none'
            autoCorrect={false}
          />
          {loading && (
            <View className='absolute right-3 top-8'>
              <ActivityIndicator
                size='small'
                color='#666'
              />
            </View>
          )}
        </View>

        {totalResults > 0 && !loading && (
          <Text className='text-white mt-3 text-sm'>
            Found {totalResults.toLocaleString()} articles
          </Text>
        )}
      </View>

      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='h-2' />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor='#3B82F6'
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingRight: 50, // Space for loading indicator
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 16,
  },
});
export default SearchApp;
