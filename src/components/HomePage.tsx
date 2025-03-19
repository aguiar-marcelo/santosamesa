"use client";
import Image from "next/image";
import React from "react";
import { Search, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import MenuSection from "./MenuSection";
import FooterSection from "./FooterSection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Alterado para flex e min-h-screen */}
      <style>{fadeInUpKeyframes}</style>
      <div className="relative w-full">
        <div
          className="bg-cover bg-center h-[350px] w-full"
          style={{ backgroundImage: "url('img/img-homepage.jpg')" }}
        >
          <MenuSection />
          <div className="flex flex-col items-center mx-8">
            <div
              className="flex flex-col items-center mt-6 text-white"
              style={{ ...styles.fadeIn }}
            >
              <h2 className="text-xl">
                Descubra lugares incríveis para comer em Santos
              </h2>
              <div className="flex gap-4 mt-4 w-full ">
                <input
                  type="text"
                  placeholder="Descubra restaurantes, cafés..."
                  className="w-full px-4 py-2 rounded-md border border-gray-400 text-black"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                  <Search /> Pesquisar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center my-6">
          <h2 className="text-2xl text-gray-800 font-bold">
            Melhores avaliados
          </h2>
        </div>

        <div
          className="grid grid-cols-3 gap-6 justify-items-center mb-10 px-8"
          style={{ ...styles.fadeIn }}
        >
          {[
            {
              name: "Burgman",
              category: "Bar",
              img: "img/img-placeholder.jpg",
            },
            {
              name: "Padrela",
              category: "Padaria",
              img: "img/img-placeholder-2.jpg",
            },
            {
              name: "Van Gogh",
              category: "Pizzaria",
              img: "img/img-placeholder-3.jpg",
            },
          ].map((place, index) => (
            <div
              key={index}
              className="shadow-lg border border-gray-400 rounded-lg bg-white w-full max-w-xs"
            >
              <img
                src={place.img}
                alt={place.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 text-gray-800">
                <b className="text-lg ">{place.name}</b>
                <p className="text-gray-600 mb-2">{place.category}</p>
                <Link
                  href="/localInfo"
                  className=" bg-primary text-white px-4 py-1 text-sm rounded-md hover:bg-blue-600"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default HomePage;

const styles = {
  fadeIn: {
    animation: "1.5s fadeInUp",
  },
};

const fadeInUpKeyframes = `
@keyframes fadeInUp {
  0% {
    transform: translateY(10%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
`;