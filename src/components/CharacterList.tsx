import { ChevronDown } from "lucide-react";
import React from "react";
import { CharacterCard } from "./CharacterCard";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";

interface CharacterListProps {
  characters: any[];

  searchQuery: string;
  hasMore: boolean;
  error: string | null;
  loading: boolean;
  loadMore: () => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  error,
  hasMore,
  searchQuery,
  loadMore,
}) => {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading && characters.length === 0) {
    return <LoadingSpinner />;
  }

  if (characters.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">
          {searchQuery
            ? "No characters found matching your search."
            : "No characters available."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      {searchQuery && (
        <div className="text-center">
          <p className="text-gray-300">
            {characters.length > 0
              ? `Found ${characters.length} character${
                  characters.length === 1 ? "" : "s"
                } matching "${searchQuery}"`
              : `No characters found for "${searchQuery}"`}
          </p>
        </div>
      )}
      {/* const character = {
                uid: item.uid,
                name: item.properties.name,
                url: item.properties.url,
              }; */}
      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => {
          const data = character?.properties
            ? {
                uid: character.uid,
                name: character.properties.name,
                url: character.properties.url,
              }
            : character;
          return <CharacterCard key={character.uid} character={data} />;
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-400/10 hover:bg-yellow-400/20 
                     text-yellow-400 rounded-lg transition-all duration-200 border border-yellow-400/20 
                     hover:border-yellow-400/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span>{loading ? "Loading..." : "Load More Characters"}</span>
          </button>
        </div>
      )}
    </div>
  );
};
