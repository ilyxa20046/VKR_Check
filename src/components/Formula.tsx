import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface FormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

const Formula: React.FC<FormulaProps> = ({ math, block = false, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          throwOnError: false,
          displayMode: block,
          output: 'html',
        });
      } catch (e) {
        if (ref.current) ref.current.textContent = math;
      }
    }
  }, [math, block]);

  if (block) {
    return (
      <div className={`my-4 overflow-x-auto text-center ${className}`}>
        <span ref={ref} />
      </div>
    );
  }

  return <span ref={ref} className={`inline-block ${className}`} />;
};

export default Formula;
