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
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        
        const data: CharacterListResponse = await response.json();
        
        // Filter characters based on search query if provided
        let filteredCharacters = data.results;
        if (searchQuery.trim()) {
          filteredCharacters = data.results.filter(character =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (page === 1) {
          setCharacters(filteredCharacters);
        } else {
          setCharacters(prev => [...prev, ...filteredCharacters]);
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