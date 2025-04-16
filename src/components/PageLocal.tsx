"use client";
import React from "react";
import { Search } from "lucide-react";
import { getRestaurants } from "@/services/routes";
import LocalInfoPage from "./LocalInfoPage";
import SectionMenu from "./SectionMenu";
import SectionFooter from "./SectionFooter";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  url_img: string;
  aboutUs: string;
  averageRating?: number;
}

const PageLocal = () => {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [restaurantSelected, setRestaurantSelected] = React.useState<Restaurant | undefined>(undefined);
  const [visibleRestaurants, setVisibleRestaurants] = React.useState<Restaurant[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(true);

  const FetchRestaurants = async () => {
    try {
      const results = await getRestaurants();
      setRestaurants(results);
    } catch (err) {
      console.error("Falha ao pesquisar", err);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    FetchRestaurants();
  }, []);

  React.useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setVisibleRestaurants(
      (filteredRestaurants.length > 0 ? filteredRestaurants : restaurants).slice(
        startIndex,
        endIndex
      )
    );
  }, [restaurants, currentPage, itemsPerPage, filteredRestaurants]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    const filteredResults = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filteredResults);
    setCurrentPage(1);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSearch();
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

                <div className="mt-[15px] mb-[45px] w-fit">
                  <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px] flex gap-[1%]">
                    <button className="bg-[#86929A] text-white rounded-xl px-4">Todos</button>
                    <button className="bg-[#86929A] text-white rounded-xl px-4">Cafés</button>
                    <button className="bg-[#86929A] text-white rounded-xl px-4">Pizzarias</button>
                    <button className="bg-[#86929A] text-white rounded-xl px-4">Churrascarias</button>
                    <button className="bg-[#86929A] text-white rounded-xl px-4">Padarias</button>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center"
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
                        src={place.url_img || null}
                        alt={place.name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="p-4 text-gray-800 flex-grow flex flex-col justify-between">
                        <div>
                          <b className="text-lg">
                            {place.name}
                          </b>
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

                {visibleRestaurants.length <
                  (filteredRestaurants.length > 0
                    ? filteredRestaurants.length
                    : restaurants.length) && (
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

export default PageLocal;