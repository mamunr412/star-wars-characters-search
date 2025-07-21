import { useState, useEffect } from "react";
import { Character } from "../types/Character";

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
          url = `https://www.swapi.tech/api/people?name=${encodeURIComponent(
            searchQuery.trim()
          )}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }

        const data: any = await response.json();

        // Ensure results is always an array to prevent undefined errors
        const results = Array.isArray(data?.results)
          ? data.results
          : data?.result
          ? data.result
          : [];

        if (page === 1) {
          setCharacters(results);
        } else {
          setCharacters((prev) => [...prev, ...results]);
        }

        if (data.next) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching characters:", err);
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
      setPage((prev) => prev + 1);
    }
  };

  return {
    characters,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
