import React from 'react';
import { Coords } from '../types';

interface CoordinatesInputProps {
  coords: Coords;
  setCoords: React.Dispatch<React.SetStateAction<Coords>>;
}

const CoordinateField: React.FC<{ label: string; value: number; onChange: (val: number) => void; }> = ({ label, value, onChange }) => (
    <div className="flex flex-col items-center">
        <label htmlFor={`coord-${label}`} className="text-xs font-mono text-godcore-text-secondary mb-1">{label.toUpperCase()}</label>
        <input
            id={`coord-${label}`}
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-20 bg-godcore-dark text-center text-godcore-text rounded-md p-1 outline-none focus:ring-2 focus:ring-godcore-accent transition-shadow"
        />
    </div>
);


export const CoordinatesInput: React.FC<CoordinatesInputProps> = ({ coords, setCoords }) => {
  const handleCoordChange = (key: keyof Coords, value: number) => {
    setCoords(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-godcore-darker/50 backdrop-blur-sm p-3 rounded-t-xl border-b border-godcore-light">
      <div className="flex justify-center items-center space-x-4">
        <p className="font-mono text-sm text-godcore-text-secondary">Spacetime Coordinates:</p>
        <CoordinateField label="x" value={coords.x} onChange={(val) => handleCoordChange('x', val)} />
        <CoordinateField label="y" value={coords.y} onChange={(val) => handleCoordChange('y', val)} />
        <CoordinateField label="z" value={coords.z} onChange={(val) => handleCoordChange('z', val)} />
        <CoordinateField label="t" value={coords.t} onChange={(val) => handleCoordChange('t', val)} />
      </div>
    </div>
  );
};