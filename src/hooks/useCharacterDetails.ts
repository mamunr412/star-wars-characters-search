import { useState, useEffect } from "react";
import { ApiResponse, ICharacterDetails } from "../types/Character";

export const useCharacterDetails = (uid: string | null) => {
  const [details, setDetails] = useState<ICharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      setDetails(null);
      return;
    }

    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.swapi.tech/api/people/${uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch character details");
        }

        const data: ApiResponse<{ properties: ICharacterDetails }> =
          await response.json();
        setDetails(data.result.properties);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching character details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [uid]);

  return { details, loading, error };
};
