import React from 'react';

const RecipeListItem = ({
  image,
  ingredientLines,
  mealType,
  source,
  totalTime,
  label,
}) => {
  return (
    <div className="flex overflow-hidden rounded-lg bg-white shadow-md">
      <div className="w-1/3">
        <img className="h-full w-full object-cover" src={image} alt={label} />
      </div>
      <div className="w-2/3 p-4">
        <h2 className="mb-2 text-2xl font-bold">{label}</h2>
        <ul className="mb-4 list-disc pl-5">
          {ingredientLines.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          <strong>Meal Type:</strong> {mealType.join(', ')}
        </p>
        <p className="text-gray-600">
          <strong>Source:</strong>{' '}
          <a
            href={`http://${source}`}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {source}
          </a>
        </p>
        <p className="text-gray-600">
          <strong>Total Time:</strong> {totalTime} minutes
        </p>
      </div>
    </div>
  );
};

export default RecipeListItem;
