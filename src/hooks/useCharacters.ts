import { useState, useEffect } from 'react';
import { Character, CharacterListResponse } from '../types/Character';

export const useCharacters = (searchQuery: string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = `https://www.swapi.tech/api/people?page=${page}&limit=10`;
        
        // Add name parameter if search query exists
        if (searchQuery.trim()) {
          url = `https://www.swapi.tech/api/people?name=${encodeURIComponent(searchQuery.trim())}&page=${page}&limit=10`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        
        const data: CharacterListResponse = await response.json();
        
        if (page === 1) {
          setCharacters(data.results);
        } else {
          setCharacters(prev => [...prev, ...data.results]);
        }
        
        setHasMore(data.next !== null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, searchQuery]);

  // Reset page when search query changes
  useEffect(() => {
    setPage(1);
    setCharacters([]);
  }, [searchQuery]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return {
    characters,
    loading,
    error,
    hasMore,
    loadMore
  };
};