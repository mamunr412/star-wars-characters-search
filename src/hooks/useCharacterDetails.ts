import { useState, useEffect } from 'react';
import { CharacterDetails, ApiResponse } from '../types/Character';

export const useCharacterDetails = (characterUrl: string | null) => {
  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!characterUrl) {
      setDetails(null);
      return;
    }

    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(characterUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch character details');
        }
        
        const data: ApiResponse<{ properties: CharacterDetails }> = await response.json();
        setDetails(data.result.properties);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching character details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterUrl]);

  return { details, loading, error };
};