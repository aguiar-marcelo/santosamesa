"use client"
import Link from 'next/link';
import Image from "../../node_modules/next/image";
import React from 'react';
import { Search } from 'lucide-react';

const LocalPage = () => {
    return (
        <div className="relative w-full h-full" style={{ backgroundImage: "url('img/localidade.jpg')", backgroundSize: 'cover' }}>
            <div className="bg-cover bg-center h-[350px] w-full">
                <div className="flex flex-col items-center ">
                    {/* Header */}
                    <div className="w-full flex justify-between gap-4 p-4 items-center">
                        <div className="flex justify-center items-center gap-2">
                            <img src="img/img-logo.png" alt="Logo" width={45} height={40} />
                            <h1 className="text-white text-2xl font-bold">SANTOS À MESA</h1>
                        </div>

                        <div className="flex justify-center rounded-lg overflow-hidden">
                            <Link href="/" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                Home
                            </Link>
                            <Link href="/local" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                Ver Localidades
                            </Link>
                            <Link href="/" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                Destaques
                            </Link>
                            <Link href="/" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                Perguntas Frequentes
                            </Link>
                            <Link href="/sobreNos" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                Sobre Nós
                            </Link>
                        </div>

                        <div className="flex justify-center gap-4 items-center">
                            <Link href="/login" className="text-white underline">
                                Login
                            </Link>
                            <Link href="/cadastro" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Cadastrar
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white mx-10 rounded-xl px-12 overflow-hidden">

                    <div className="mt-10">
                        <h2 className="text-xl text-gray-800 font-bold">Explorar Locais</h2>

                        <div className="flex gap-4 mt-4 w-1/2">
                            <input type="text" placeholder="Buscar restaurantes" className="w-full px-4 py-2 rounded-md border border-gray-400 text-black" />
                            <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                                <Search /> Pesquisar
                            </button>
                        </div>
                    </div>

                    <div className="mt-[15px] mb-[45px] w-fit">
                        <div className="border-2 border-[#c8c5c5] rounded-lg p-[10px]">
                            <div className="flex gap-[1%]">
                                <button className="bg-[#86929A] text-white rounded-xl px-4">Todos</button>
                                <button className="bg-[#86929A] text-white rounded-xl px-4">Cafés</button>
                                <button className="bg-[#86929A] text-white rounded-xl px-4">Pizzarias</button>
                                <button className="bg-[#86929A] text-white rounded-xl px-4">Churrascarias</button>
                                <button className="bg-[#86929A] text-white rounded-xl px-4">Padarias</button>
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


                    <div className="grid grid-cols-4 gap-6 justify-items-center">
                        {[
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
                            { name: "Burgman", category: "Bar", img: "img/img-placeholder.jpg" },
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
                    <Image src={"/img/img-mureta.png"} width="1000" height="1000" className="w-full" alt="muretas-santos" />
                </div>
            </div>
        </div >
    );
};

export default LocalPage;
