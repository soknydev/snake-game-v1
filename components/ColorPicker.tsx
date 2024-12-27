import React from "react";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  return (
    <div>
      <label className="block mb-2 font-medium">Select Snake Color:</label>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-12 h-12 cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;
