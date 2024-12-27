import React from "react";

interface LevelSelectorProps {
  selectedLevel: number;
  onLevelChange: (level: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ selectedLevel, onLevelChange }) => {
  return (
    <div>
      <label className="block mb-2 font-medium">Select Level:</label>
      <select
        value={selectedLevel}
        onChange={(e) => onLevelChange(parseInt(e.target.value))}
        className="px-4 py-2 border rounded"
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <option key={level} value={level}>
            Level {level}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LevelSelector;
