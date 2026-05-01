import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  math: string;
  block?: boolean;
  label?: string;
}

export const Formula: React.FC<FormulaProps> = ({ math, block, label }) => {
  if (block) {
    return (
      <div className="flex items-center justify-center gap-4 my-3 overflow-x-auto">
        <BlockMath math={math} />
        {label && (
          <span className="text-gray-500 text-sm shrink-0">({label})</span>
        )}
      </div>
    );
  }
  return <InlineMath math={math} />;
};
