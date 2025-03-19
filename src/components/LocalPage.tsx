"use client";
import React from "react";
import { Search } from "lucide-react";
import { getRestaurants } from "@/services/routes";
import LocalInfoPage from "./LocalInfoPage";
import MenuSection from "./MenuSection";
import FooterSection from "./FooterSection";
import Link from "next/link";

const LocalPage = () => {
  const [restaurants, setRestaurants] = React.useState<any[]>([]);
  const [restaurantSelected, setRestaurantSelected] = React.useState();
  const [visibleRestaurants, setVisibleRestaurants] = React.useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);

  const FetchUsers = async () => {
    try {
      const results = await getRestaurants();
      setRestaurants(results);
    } catch (err) {
      console.error("Falha ao pesquisar", err);
      setRestaurants([]);
    } finally {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    FetchUsers();
  }, []);

  React.useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setVisibleRestaurants(restaurants.slice(startIndex, endIndex));
  }, [restaurants, currentPage, itemsPerPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
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
              backgroundImage:
                "url('img/localidade.jpg')",
              backgroundSize: "cover, 100% 100%",
              backgroundRepeat: "no-repeat, no-repeat",
              zIndex: -1,
            }}
          ></div>
          <div className="relative z-10 w-full flex-grow">
            <MenuSection />
            <div className="flex flex-col items-center mx-8">
              <div className="bg-white mx-10 mb-10 rounded-xl px-12 overflow-hidden">
                <div className="mt-10">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-xl text-gray-800 font-bold m-0">
                      Explorar Locais
                    </h2>
                    <Link
                      href="/localCadastro"
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
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                      <Search /> Pesquisar
                    </button>
                  </div>
                </div>

                <div className="mt-[15px] mb-[45px] w-fit">
                  <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px]">
                    <div className="flex gap-[1%]">
                      <button className="bg-[#86929A] text-white rounded-xl px-4">
                        Todos
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4">
                        Cafés
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4">
                        Pizzarias
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4">
                        Churrascarias
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4">
                        Padarias
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                        5
                        <img className="w-[15px] h-[15px] ml-1" src="img/estrela-preenchida.png" alt="Estrela" />
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                        4
                        <img className="w-[15px] h-[15px] ml-1" src="img/estrela-preenchida.png" alt="Estrela" />
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                        3
                        <img className="w-[15px] h-[15px] ml-1" src="img/estrela-preenchida.png" alt="Estrela" />
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                        2
                        <img className="w-[15px] h-[15px] ml-1" src="img/estrela-preenchida.png" alt="Estrela" />
                      </button>
                      <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                        1
                        <img className="w-[15px] h-[15px] ml-1" src="img/estrela-preenchida.png" alt="Estrela" />
                      </button>
                    </div>
                  </div>
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
                          <b className="text-lg ">{place.name}</b>
                          <p
                            className="text-gray-600 mb-2 overflow-hidden text-ellipsis"
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

                {visibleRestaurants.length < restaurants.length && (
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
            <FooterSection />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalPage;