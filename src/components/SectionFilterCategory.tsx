"use client";
import React from "react";

const SectionFilterCategory: React.FC<FilterCategoryProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedRatingRanges,
  onRatingChange,
}) => {
  const isCategorySelected = (categoryName: string) =>
    selectedCategories.includes(categoryName);

  const getRatingRangeFromValue = (rating: number) => {
    if (rating === 1) return { min: 0.1, max: 1.4 };
    if (rating === 2) return { min: 1.5, max: 2.4 };
    if (rating === 3) return { min: 2.5, max: 3.4 };
    if (rating === 4) return { min: 3.5, max: 4.4 };
    if (rating === 5) return { min: 4.5, max: 5 };
    return { min: undefined, max: undefined };
  };

  const isRatingSelected = (ratingValue: number) => {
    const range = getRatingRangeFromValue(ratingValue);
    return selectedRatingRanges.some(
      (selectedRange) => selectedRange.min === range.min && selectedRange.max === range.max
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange(categoryName);
  };

  const handleRatingClick = (rating: number) => {
    onRatingChange(rating);
  };

  const selectedButtonStyle = {
    backgroundColor: 'rgb(99 113 122)',
  };

  return (
    <div className="mt-[15px] mb-[45px] w-fit">
      <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px] flex gap-[1%] overflow-x-auto">
        <button
          className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap ${
            selectedCategories.includes("Todos") ? "" : ""
          }`}
          style={selectedCategories.includes("Todos") ? selectedButtonStyle : {}}
          onClick={() => handleCategoryClick("Todos")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap ${
              isCategorySelected(category.name || "") ? "" : ""
            }`}
            style={isCategorySelected(category.name || "") ? selectedButtonStyle : {}}
            onClick={() => handleCategoryClick(category.name || "")}
          >
            {category.name}
          </button>
        ))}
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            className={`bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center whitespace-nowrap ${
              isRatingSelected(rating) ? "" : ""
            }`}
            style={isRatingSelected(rating) ? selectedButtonStyle : {}}
            onClick={() => handleRatingClick(rating)}
          >
            {rating}
            <img
              className="w-[15px] h-[15px] ml-1"
              src="img/estrela-preenchida.png"
              alt="Estrela"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionFilterCategory;