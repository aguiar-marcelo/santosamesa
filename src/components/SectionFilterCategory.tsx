import React from "react";

interface Category {
  id: string;
  name: string;
}

interface FilterCategoryProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryClick: (categoryName: string | null) => void;
}

const SectionFilterCategory: React.FC<FilterCategoryProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <div className="mt-[15px] mb-[45px] w-fit">
      <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px] flex gap-[1%] overflow-x-auto">
        <button
          className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap ${
            selectedCategory === "Todos" ? "bg-[#556B74]" : ""
          }`}
          onClick={() => onCategoryClick("Todos")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap ${
              selectedCategory === category.name ? "bg-[#556B74]" : ""
            }`}
            onClick={() => onCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center whitespace-nowrap"
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