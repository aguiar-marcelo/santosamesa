{/* <Image src={"/img/img-logo.png"} width="45" height="40" alt="Logo" /> */ }

import Image from "../../node_modules/next/image";
import React from "react";
import { Search } from 'lucide-react';
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="relative w-full h-full">
      <div className="bg-cover bg-center h-[350px] w-full"
        style={{ backgroundImage: "url('img/img-homepage.jpg')" }}
      >
        <div className="flex flex-col items-center ">
          {/* Header */}
          <div className="w-full flex justify-between gap-4 p-4 items-center">
            <div className="flex justify-center items-center gap-2">
              <img src="img/img-logo.png" alt="Logo" width={45} height={40} />
              <h1 className="text-white text-2xl font-bold">SANTOS À MESA</h1>
            </div>

            <div className="flex justify-center rounded-lg overflow-hidden">
              {['Home', 'Ver Localidades', 'Destaques', 'Perguntas Frequentes'].map((item, index) => (
                <button key={index} className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                  {item}
                </button>
              ))}
              <Link href="/sobreNos" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                Sobre Nós
              </Link>
            </div>

            <div className="flex justify-center gap-4">
              <Link href="/login" className="text-white underline">
                Login
              </Link>
              <Link href="/cadastro" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Cadastrar
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center mt-6 text-white">
            <h2 className="text-xl">Descubra lugares incríveis para comer em Santos</h2>
            <div className="flex gap-4 mt-4 w-full ">
              <input type="text" placeholder="Descubra restaurantes, cafés..." className="w-full px-4 py-2 rounded-md border border-gray-400" />
              <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                <Search /> Pesquisar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center my-6">
        <h2 className="text-2xl text-gray-800 font-bold">Melhores avaliados</h2>
      </div>

      <div className="grid grid-cols-3 gap-6 justify-items-center mb-10 px-8">
        {[
          { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
          { name: "Padrela", category: "Padaria", img: "img/img-placeholder-2.jpg" },
          { name: "Van Gogh", category: "Pizzaria", img: "img/img-placeholder-3.jpg" }
        ].map((place, index) => (
          <div key={index} className="shadow-lg border border-gray-400 rounded-lg bg-white w-full max-w-xs">
            <img src={place.img} alt={place.name} className="w-full h-40 object-cover rounded-t-lg" />
            <div className="p-4 text-center text-gray-800">
              <b className="text-lg">{place.name}</b>
              <p className="text-gray-600">{place.category}</p>
              <button className="mt-2 bg-primary text-white px-4 py-1 text-sm rounded-md hover:bg-blue-600">Saiba mais</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-[#247895] w-full absolute bottom-0 text-center  text-white pt-8">
        <h3 className="text-lg font-bold">SANTOS À MESA</h3>
        <p>©2025, Santos à Mesa. Todos os direitos reservados.</p>
        <Image src={"/img/img-mureta.png"} width="1000" height="1000" className="w-full" alt="muretas-santos" />
      </footer>
    </div>
  );
};

export default HomePage;
