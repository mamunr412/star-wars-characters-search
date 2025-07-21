import { useState } from "react";
import { CharacterList } from "../components/CharacterList";
import { SearchBar } from "../components/SearchBar";
import { useCharacters } from "../hooks/useCharacters";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { characters, loading, error, hasMore, loadMore } =
    useCharacters(searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Character List */}

          <CharacterList
            characters={characters}
            loading={loading}
            error={error}
            hasMore={hasMore}
            loadMore={loadMore}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-yellow-400/20 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400">
            <p>Data provided by SWAPI - The Star Wars API</p>
            <p className="text-sm mt-1">May the Force be with you</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
