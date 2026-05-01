import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface FormulaProps {
  math: string;
  block?: boolean;
  label?: string;
}

export const Formula: React.FC<FormulaProps> = ({ math, block = false, label }) => {
  if (block) {
    return (
      <div className="my-4 flex items-center justify-center gap-6">
        <div className="overflow-x-auto">
          <BlockMath math={math} />
        </div>
        {label && (
          <span className="text-gray-500 text-sm whitespace-nowrap">({label})</span>
        )}
      </div>
    );
  }
  return <InlineMath math={math} />;
};
