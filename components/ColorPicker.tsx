import React from "react";

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <label className="block mb-2 font-medium text-[22px]">Select Snake Color:</label>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-40 h-12 cursor-pointer rounded-[10px] focus:outline-none"
        style={{
          border: "none",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default ColorPicker;
