import React from 'react';
import { Character } from '../types/Character';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { User, Ruler, Weight, Eye, Calendar, MapPin, Palette } from 'lucide-react';

interface CharacterDetailsProps {
  character: Character;
}

export const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  const { details, loading, error } = useCharacterDetails(character.url);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!details) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No character details available.</div>
      </div>
    );
  }

  const formatValue = (value: string) => {
    if (value === 'n/a' || value === 'unknown') {
      return 'Unknown';
    }
    return value;
  };

  const detailItems = [
    { icon: Ruler, label: 'Height', value: formatValue(details.height) + (details.height !== 'unknown' && details.height !== 'n/a' ? ' cm' : '') },
    { icon: Weight, label: 'Mass', value: formatValue(details.mass) + (details.mass !== 'unknown' && details.mass !== 'n/a' ? ' kg' : '') },
    { icon: Calendar, label: 'Birth Year', value: formatValue(details.birth_year) },
    { icon: User, label: 'Gender', value: formatValue(details.gender) },
    { icon: Eye, label: 'Eye Color', value: formatValue(details.eye_color) },
    { icon: Palette, label: 'Hair Color', value: formatValue(details.hair_color) },
    { icon: Palette, label: 'Skin Color', value: formatValue(details.skin_color) },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Character Header */}
      <div className="bg-gradient-to-r from-yellow-400/10 to-purple-600/10 backdrop-blur-sm 
                    border border-yellow-400/20 rounded-2xl p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="p-4 bg-yellow-400/20 rounded-full">
            <User className="h-12 w-12 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{details.name}</h1>
            <p className="text-gray-300 text-lg">Star Wars Character Profile</p>
          </div>
        </div>
      </div>

      {/* Character Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {detailItems.map((item) => (
          <div
            key={item.label}
            className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 
                     hover:bg-white/10 hover:border-yellow-400/40 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <item.icon className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                {item.label}
              </h3>
            </div>
            <p className="text-xl font-semibold text-white capitalize">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
          <MapPin className="h-6 w-6 text-yellow-400" />
          <span>Additional Information</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
              Character ID
            </h3>
            <p className="text-lg text-white">{details.uid}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
              Homeworld
            </h3>
            <p className="text-lg text-white">
              {details.homeworld ? 'Available via API' : 'Unknown'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
              Films
            </h3>
            <p className="text-lg text-white">
              {details.films?.length > 0 ? `${details.films.length} film(s)` : 'None listed'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
              Vehicles & Starships
            </h3>
            <p className="text-lg text-white">
              {(details.vehicles?.length || 0) + (details.starships?.length || 0)} total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};