import React from 'react';

interface SNAPToggleProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

const SNAPToggle: React.FC<SNAPToggleProps> = ({ value, onChange }) => {
  return (
    <button
      type="button"
      className={`flex items-center px-4 py-2 rounded-lg font-semibold border-2 transition-colors duration-150 focus:outline-none ${
        value
          ? 'bg-wmt-accent-green border-wmt-accent-green text-white'
          : 'bg-white border-wmt-gray-500 text-wmt-dark'
      }`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
    >
      <span className="mr-2">{value ? 'Using SNAP/EBT' : 'Use SNAP/EBT'}</span>
      <span
        className={`inline-block w-4 h-4 rounded-full border ${
          value ? 'bg-white border-white' : 'bg-wmt-gray-100 border-wmt-gray-500'
        }`}
      />
    </button>
  );
};

export default SNAPToggle;
