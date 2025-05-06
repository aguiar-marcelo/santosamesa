"use client";
import React from "react";

interface Category {
  id: string;
  name: string;
}

interface FilterCategoryProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryName: string) => void;
  selectedRatings: number[];
  onRatingChange: (rating: number) => void;
}

const SectionFilterCategory: React.FC<FilterCategoryProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedRatings,
  onRatingChange,
}) => {
  const isCategorySelected = (categoryName: string) =>
    selectedCategories.includes(categoryName);

  const isRatingSelected = (ratingValue: number) => {
    return selectedRatings.includes(ratingValue);
  };

  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange(categoryName);
  };

  const handleRatingClick = (rating: number) => {
    onRatingChange(rating);
  };

  const selectedButtonStyle = {
    backgroundColor: "rgb(99 113 122)",
  };

  return (
    <div className="mt-[15px] mb-[45px] w-full">
      <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px] flex gap-[1%] overflow-x-auto">
        <button
          className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap hover:bg-[rgb(99_113_122)] ${
            selectedCategories.includes("Todos") ? "selected" : ""
          }`}
          style={
            selectedCategories.includes("Todos") ? selectedButtonStyle : {}
          }
          onClick={() => handleCategoryClick("Todos")}
        >
          Todos
        </button>
        {Array.isArray(categories) &&
          categories?.map((category) => (
            <button
              key={category.id}
              className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap hover:bg-[rgb(99_113_122)] ${
                isCategorySelected(category.name || "") ? "selected" : ""
              }`}
              style={
                isCategorySelected(category.name || "")
                  ? selectedButtonStyle
                  : {}
              }
              onClick={() => handleCategoryClick(category.name || "")}
            >
              {category.name}
            </button>
          ))}
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            className={`bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center whitespace-nowrap hover:bg-[rgb(99_113_122)] ${
              isRatingSelected(rating) ? "selected" : ""
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
      <style jsx>{`
        .selected {
          background-color: rgb(99 113 122);
        }
      `}</style>
    </div>
  );
};

export default SectionFilterCategory;
