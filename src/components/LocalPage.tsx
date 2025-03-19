"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { LogOut, Search, User } from "lucide-react";
import { getRestaurants } from "@/services/routes";
import { useAuth } from "@/context/AuthContext";
import LocalInfoPage from "./LocalInfoPage";
import MenuSection from "./MenuSection";

const LocalPage = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantSelected, setRestaurantSelected] = useState();
  const { user, token, signOut } = useAuth();
  const FetchUsers = async () => {
    try {
      //   setLoading(true);
      const results = await getRestaurants();
      setRestaurants(results);
    } catch (err) {
      console.error("Falha ao pesquisar", err);
      setRestaurants([]);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    FetchUsers();
  }, []);
  return (<>

    {restaurantSelected ? <LocalInfoPage data={restaurantSelected} setData={setRestaurantSelected} /> : <div
      className="relative w-full h-full"
      style={{
        backgroundImage: "url('img/localidade.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-cover bg-center h-[350px] w-full">
        <MenuSection />
        <div className="flex flex-col items-center mx-8">
          <div className="bg-white mx-10 rounded-xl px-12 overflow-hidden">
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
                    <img
                      className="w-[15px] h-[15px] ml-1"
                      src="img/estrela-preenchida.png"
                      alt="Estrela"
                    />
                  </button>
                  <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                    4
                    <img
                      className="w-[15px] h-[15px] ml-1"
                      src="img/estrela-preenchida.png"
                      alt="Estrela"
                    />
                  </button>
                  <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                    3
                    <img
                      className="w-[15px] h-[15px] ml-1"
                      src="img/estrela-preenchida.png"
                      alt="Estrela"
                    />
                  </button>
                  <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                    2
                    <img
                      className="w-[15px] h-[15px] ml-1"
                      src="img/estrela-preenchida.png"
                      alt="Estrela"
                    />
                  </button>
                  <button className="bg-[#86929A] text-white rounded-xl px-4 flex items-center justify-center">
                    1
                    <img
                      className="w-[15px] h-[15px] ml-1"
                      src="img/estrela-preenchida.png"
                      alt="Estrela"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 justify-items-center">
              {restaurants.map((place, index) => (
                <div
                  key={index}
                  className="shadow-lg border border-gray-400 rounded-lg bg-white w-full max-w-xs"
                >
                  <img
                    src={place.url_img}
                    alt={place.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4 text-gray-800">
                    <b className="text-lg ">{place.name}</b>
                    <p className="text-gray-600 mb-2">{place.aboutUs}</p>
                    <button
                      type="button"
                      onClick={() => setRestaurantSelected(place)}
                      className=" bg-primary text-white px-4 py-1 text-sm rounded-md hover:bg-blue-600"
                    >
                      Saiba mais
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="m-10 flex justify-center">
              <button className="px-4 py-1 rounded-md flex items-center gap-2 border-2 border-black font-bold">
                Carregar Mais
              </button>
            </div>
          </div>

          <div className="bg-[#247895] mt-[30px] w-full">
            <div className="flex flex-col items-center text-[#e8e8ec] p-[15px]">
              <h3>SANTOS À MESA</h3>
              ©2025, Santos à Mesa. Todos os direitos reservados.
            </div>
            <Image
              src={"/img/img-mureta.png"}
              width="1000"
              height="1000"
              className="w-full"
              alt="muretas-santos"
            />
          </div>
        </div>
      </div>
    </div>} </>
  );
};

export default LocalPage;
