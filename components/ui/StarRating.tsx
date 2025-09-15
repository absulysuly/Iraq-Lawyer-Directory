import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  starSize?: string;
}

const Star: React.FC<{ filled: boolean; size: string }> = ({ filled, size }) => (
  <svg
    className={`inline-block ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  starSize = '1.25rem', // Corresponds to h-5 w-5 in Tailwind
}) => {
  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Star key={index} filled={index < rating} size={starSize} />
      ))}
    </div>
  );
};

export default StarRating;
