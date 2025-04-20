"use client";
import React from "react";
import { Search } from "lucide-react";
import { getRestaurantsByCategory, getCategories } from "@/services/routes";
import LocalInfoPage from "./LocalInfoPage";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import SectionFooter from "./SectionFooter";
import SectionMenu from "./SectionMenu";
import SectionFilterCategory from "@/components/SectionFilterCategory";

interface Restaurant {
  id: string;
  name: string;
  url_img: string;
  aboutUs: string;
  averageRating?: number;
  category?: string | { id: string; name: string }; 
  categoryName?: string; 
}

interface Category {
  id: string;
  name: string;
}

const LocalPage = () => {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [restaurantSelected, setRestaurantSelected] = React.useState<Restaurant | undefined>(undefined);
  const [visibleRestaurants, setVisibleRestaurants] = React.useState<Restaurant[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>("Todos");

  const FetchRestaurants = async (query?: { categoryId?: string | null }) => {
    setLoading(true);
    try {
      const results = await getRestaurantsByCategory(query);
      setRestaurants(results);
      setFilteredRestaurants(results);
      setCurrentPage(1);
    } catch (err) {
      console.error("Falha ao pesquisar restaurantes", err);
      setRestaurants([]);
      setFilteredRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const FetchCategories = async () => {
    try {
      const results = await getCategories();
      setCategories(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
      setCategories([]);
    }
  };

  React.useEffect(() => {
    FetchRestaurants({});
    FetchCategories();
  }, []);

  React.useEffect(() => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
    setCurrentPage(1);
  }, [restaurants, searchTerm]);

  React.useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setVisibleRestaurants(
      filteredRestaurants.slice(
        startIndex,
        endIndex
      )
    );
  }, [filteredRestaurants, currentPage, itemsPerPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    let filteredResults = restaurants;
    if (searchTerm) {
      filteredResults = filteredResults.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredRestaurants(filteredResults);
    setCurrentPage(1);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategoryClick = (categoryName: string | null) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory("Todos");
      FetchRestaurants({});
    } else {
      setSelectedCategory(categoryName);
      if (categoryName === "Todos") {
        FetchRestaurants({});
      } else if (categoryName) {
        const selectedCategoryObject = categories.find(
          (cat) => cat.name?.toLowerCase() === categoryName?.toLowerCase()
        );
        if (selectedCategoryObject?.id) {
          FetchRestaurants({ categoryId: selectedCategoryObject.id });
        } else {
          FetchRestaurants({});
        }
      } else {
        FetchRestaurants({});
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {restaurantSelected ? (
        <LocalInfoPage data={restaurantSelected} setData={setRestaurantSelected} />
      ) : (
        <div className="relative w-full flex-grow">
          <div
            className="fixed inset-0"
            style={{
              backgroundImage: "url('img/localidade.jpg')",
              backgroundSize: "cover, 100% 100%",
              backgroundRepeat: "no-repeat, no-repeat",
              zIndex: -1,
            }}
          ></div>
          <div className="relative z-10 w-full flex-grow">
            <SectionMenu />
            <div className="flex flex-col items-center mx-8 mt-10">
              <div className="bg-white mx-10 mb-8 rounded-xl px-12 overflow-hidden">
                <div className="mt-10">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl text-gray-800 font-bold m-0 flex items-center gap-2">
                      Explorar Locais
                    </h2>
                    <Link
                      href="/local-cadastro"
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Cadastrar Local
                    </Link>
                  </div>
                  <div className="flex gap-4 mt-4 w-1/2">
                    <input
                      type="text"
                      placeholder="Buscar restaurantes"
                      className="w-full px-4 py-2 rounded-md border border-gray-400 text-black"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                      onClick={handleSearch}
                    >
                      <Search /> Pesquisar
                    </button>
                  </div>
                </div>
                <SectionFilterCategory
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryClick={handleCategoryClick}
                />

                <div className="flex justify-center">
                  {loading && <Loader2 className="h-5 w-5 animate-spin text-black" />}
                </div>

                <div className="grid grid-cols-4 gap-6 justify-items-center mb-12">
                  {visibleRestaurants.map((place, index) => (
                    <div
                      key={index}
                      className="shadow-lg border border-gray-400 rounded-lg bg-white w-full max-w-xs flex flex-col"
                    >
                      <img
                        src={place.url_img ?? undefined}
                        alt={place.name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="p-4 text-gray-800 flex-grow flex flex-col justify-between">
                        <div>
                          <b className="text-lg">{place.name}</b>
                          {place.category && typeof place.category === 'string' && (
                            <p className="text-sm text-gray-500 mt-1">
                              Categoria: {place.category}
                            </p>
                          )}
                          {place.category && typeof place.category === 'object' && place.category.name && (
                            <p className="text-sm text-gray-500 mt-1">
                              Categoria: {place.category.name}
                            </p>
                          )}
                          {place.averageRating !== undefined && (
                            <div className="flex items-center mt-1">
                              {Array(Math.round(place.averageRating))
                                .fill(0)
                                .map((_, starIndex) => (
                                  <img
                                    key={`filled-${place.id}-${starIndex}`}
                                    className="w-[18px] h-[18px] mr-[2px]"
                                    src="img/estrela-preenchida.png"
                                    alt="Estrela"
                                  />
                                ))}
                            </div>
                          )}
                          <p
                            className="text-gray-600 mb-2 overflow-hidden text-ellipsis mt-1"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {place.aboutUs}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRestaurantSelected(place)}
                          className="bg-primary text-white px-4 py-1 text-sm rounded-md hover:bg-blue-600 mt-2 self-start"
                        >
                          Saiba mais
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {visibleRestaurants.length < filteredRestaurants.length && (
                  <div className="m-10 flex justify-center">
                    <button
                      className="px-4 py-1 rounded-md flex items-center gap-2 border-2 border-black font-bold"
                      onClick={handleLoadMore}
                    >
                      Carregar Mais
                    </button>
                  </div>
                )}
              </div>
            </div>
            <SectionFooter />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalPage;