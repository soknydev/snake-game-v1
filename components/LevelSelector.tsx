import React from "react";

interface LevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ selectedLevel, onLevelChange }) => {
  const levels = ["easy", "medium", "hard", "very hard"];

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <label className="block mb-2 font-medium text-[22px]">Select Level:</label>
      <select
        value={selectedLevel}
        onChange={(e) => onLevelChange(e.target.value)}
        className="px-4 py-2 min-w-[150px] border rounded-[10px]"
      >
        {levels.map((level) => (
          <option key={level} value={level}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LevelSelector;
