import React from "react";

const SectionFilterCategory: React.FC<FilterCategoryProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  console.log("SectionFilterCategory rendered. selectedCategory prop:", selectedCategory);

  const selectedButtonStyle = {
    backgroundColor: 'rgb(99 113 122)',
  };

  return (
    <div className="mt-[15px] mb-[45px] w-fit">
      <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px] flex gap-[1%] overflow-x-auto">
        <button
          className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap ${
            selectedCategory === "Todos" ? "" : ""
          }`}
          style={selectedCategory === "Todos" ? selectedButtonStyle : {}}
          onClick={() => onCategoryClick("Todos")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`bg-[#86929A] text-white rounded-xl px-4 whitespace-nowrap ${
              selectedCategory?.toLowerCase() === category.name?.toLowerCase() ? "" : ""
            }`}
            style={selectedCategory?.toLowerCase() === category.name?.toLowerCase() ? selectedButtonStyle : {}}
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