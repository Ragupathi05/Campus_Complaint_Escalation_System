import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ value = 0, onChange, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`p-1 rounded-full transition-transform ${
            !readOnly ? 'hover:scale-110 focus:outline-none' : 'cursor-default'
          }`}
        >
          <Star
            className={`w-5 h-5 ${
              (hover || value) >= star
                ? 'text-cyan-500 fill-cyan-500 drop-shadow-xs'
                : 'text-slate-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};
