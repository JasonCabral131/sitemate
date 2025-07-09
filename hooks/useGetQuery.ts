/** @format */

// useGetQuery.ts
import { constant } from '@/constants/configVariable';
import { useEffect, useState, useCallback } from 'react';

interface QueryOptions {
  params?: Record<string, string | number | boolean>;
}

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const buildUrl = (endpoint: string, params?: Record<string, any>) => {
  const url = new URL(endpoint, constant.BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }
  return url.toString();
};

export function useGetQuery<T = any>(
  endpoint: string,
  options?: QueryOptions
): QueryResult<T> {
  const url = buildUrl(endpoint, options?.params);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((json: T) => {
        setData(json);
        setLoading(false);
      })
      .catch((e: any) => {
        setError(e.message ?? 'Error fetching data');
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    if (!data) fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
