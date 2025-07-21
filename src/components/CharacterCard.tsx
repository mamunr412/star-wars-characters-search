import React from "react";
import { Character } from "../types/Character";
import { User, ExternalLink } from "lucide-react";
import { Link } from "react-router";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Link to={`/${character.uid}`}>
      {" "}
      <div
        // onClick={onClick}
        className="group bg-white/5 backdrop-blur-sm border border-gray-700 rounded-xl p-6 
               hover:bg-white/10 hover:border-yellow-400/40 transition-all duration-300 
               cursor-pointer transform hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-400/10"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-400/10 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
              <User className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate group-hover:text-yellow-400 transition-colors">
                {character.name}
              </h3>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors opacity-0 group-hover:opacity-100" />
        </div>

        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          Click to view detailed information
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 group-hover:border-gray-600 transition-colors">
          <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
            Character ID: {character.uid}
          </div>
        </div>
      </div>
    </Link>
  );
};
