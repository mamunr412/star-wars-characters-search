import React, { useState } from 'react';
import { CharacterList } from './components/CharacterList';
import { CharacterDetails } from './components/CharacterDetails';
import { SearchBar } from './components/SearchBar';
import { Character } from './types/Character';
import { Star, ArrowLeft } from 'lucide-react';

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleBackToList = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
              <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
                Star Wars Database
              </h1>
            </div>
            {selectedCharacter && (
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-400/10 hover:bg-yellow-400/20 
                         text-yellow-400 rounded-lg transition-all duration-200 border border-yellow-400/20 
                         hover:border-yellow-400/40"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Characters</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCharacter ? (
          <div className="space-y-8">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            
            {/* Character List */}
            <CharacterList 
              searchQuery={searchQuery} 
              onCharacterSelect={handleCharacterSelect} 
            />
          </div>
        ) : (
          <CharacterDetails character={selectedCharacter} />
        )}
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
}

export default App;