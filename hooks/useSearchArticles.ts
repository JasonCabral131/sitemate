/** @format */

import { useState, useEffect, useCallback } from 'react';
import { constant } from '@/constants/configVariable';
import { NewsType } from '@/utils/types';

interface SearchResult {
  status: string;
  totalResults: number;
  articles: NewsType[];
}

interface UseSearchArticlesReturn {
  articles: NewsType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalResults: number;
}

export const useSearchArticles = (
  debounceMs = 500
): UseSearchArticlesReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [articles, setArticles] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Search effect
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setArticles([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    const searchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL('everything', constant.BASE_URL);
        url.searchParams.append('q', debouncedQuery);
        url.searchParams.append('apiKey', constant.API_KEY);
        url.searchParams.append('sortBy', 'publishedAt');
        url.searchParams.append('pageSize', '20');

        const response = await fetch(url.toString());

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          } else if (response.status === 401) {
            throw new Error(
              'Invalid API key. Please check your configuration.'
            );
          } else {
            throw new Error(`HTTP error: ${response.status}`);
          }
        }

        const data: SearchResult = await response.json();

        if (data.status === 'ok') {
          setArticles(data.articles || []);
          setTotalResults(data.totalResults || 0);
        } else {
          throw new Error('Failed to fetch articles');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setArticles([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    searchArticles();
  }, [debouncedQuery]);

  return {
    articles,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    totalResults,
  };
};
