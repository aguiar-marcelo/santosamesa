"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
    const { user, token, signOut } = useAuth();
    return (
        <div className="relative w-full h-full">
            <div className="bg-cover bg-center h-[350px] w-full">
                <div className="flex flex-col items-center bg-gradient-to-r from-[#37ADE4] to-[#1F607E]">
                    <div className="w-full flex justify-between gap-4 p-4 items-center ">
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

                <div className="ml-[70px] mr-[70px]">
                    <div className="flex gap-[5%] items-center mt-[30px] mb-[30px]">
                        <img
                            className="rounded-full w-[100px] h-[100px] object-cover"
                            src="img/placeholder-perfil.png"
                            alt="Foto de Perfil"
                        />
                        <div className="flex flex-col">
                            <div className="ml-[70px] mr-[70px]">
                                <div className="flex gap-[5%] items-center mt-[30px] mb-[30px]">
                                   {/*  <img
                                        className="rounded-full w-[100px] h-[100px] object-cover"
                                        src="img/placeholder-perfil.png"
                                        alt="Foto de Perfil"
                                    /> */}
                                    <div className="flex flex-col">

                                        {/* <h1 className="mb-[4px] mt-[4px]"></h1> */}

                                        {user && token ? (
                                            <span>{user.email}</span>
                                        ) : (
                                            <>
                                                {" "}
                                                <div className="flex items-center">
                                                    <img
                                                        className="w-[25px] h-[25px] mr-[5px]"
                                                        src="img/estrela.png"
                                                        alt="Estrela"
                                                    />
                                                    <h4 className="text-[#9D9393] my-0">3 avaliações</h4>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img
                                    className="w-[25px] h-[25px] mr-[5px]"
                                    src="img/estrela.png"
                                    alt="Estrela"
                                />
                                <h4 className="text-[#9D9393] my-0">3 avaliações</h4>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[20%_68%_10%] gap-[1%] items-center">
                        <h2 className="font-bold">Minhas Avaliações</h2>
                        <div className="flex items-center gap-2">
                            <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                                5 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
                            </button>
                            <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                                4 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
                            </button>
                            <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                                3 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
                            </button>
                            <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                                2 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
                            </button>
                            <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                                1 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
                            </button>
                        </div>
                        <button className="bg-[#55798E] text-white rounded-md">Editar Perfil</button>
                    </div>
                    <div className="border-2 border-[#666565] rounded-lg p-[30px] mt-[15px]">
                        <div>
                            <div className="flex">
                                <img className="w-[100px] h-[100px]" src="img/img-placeholder.jpg" alt="Review" />
                                <div className="flex flex-col ml-[10px] gap-[3%]">
                                    <h3 className="mt-0 mb-[3px] font-bold">Burgman</h3>
                                    <img
                                        className="w-[25px] h-[25px] mr-[5px]"
                                        src="img/estrela-preenchida.png"
                                        alt="Estrela"
                                    />
                                    <h5 className="text-[#9D9393] mt-2">01/03/2025</h5>
                                </div>
                            </div>
                            <h4 className="mb-0">
                                Um dos bares mais únicos da Tolentino! O ambiente é muito bonito e estilizado. A comida é ótima, mas achei
                                caro demais.
                            </h4>
                        </div>
                    </div>

                    <div className="border-2 border-[#666565] rounded-lg p-[30px] mt-[15px]">
                        <div>
                            <div className="flex">
                                <img className="w-[100px] h-[100px]" src="img/img-placeholder-2.jpg" alt="Review" />
                                <div className="flex flex-col ml-[10px] gap-[3%]">
                                    <h3 className="mt-0 mb-[3px] font-bold">Padrela</h3>
                                    <img
                                        className="w-[25px] h-[25px] mr-[5px]"
                                        src="img/estrela-preenchida.png"
                                        alt="Estrela"
                                    />
                                    <h5 className="text-[#9D9393] mt-2">02/03/2025</h5>
                                </div>
                            </div>
                            <h4 className="mb-0">
                                Adorei o local. A variedade do cardápio é ótima, o ambiente é aconchegante e os atendentes são super
                                atenciosos! Recomendo.
                            </h4>
                        </div>
                    </div>

                    <div className="border-2 border-[#666565] rounded-lg p-[30px] mt-[15px]">
                        <div>
                            <div className="flex">
                                <img className="w-[100px] h-[100px]" src="img/img-placeholder-3.jpg" alt="Review" />
                                <div className="flex flex-col ml-[10px] gap-[3%]">
                                    <h3 className="mt-0 mb-[3px] font-bold">Van Gogh</h3>
                                    <img
                                        className="w-[25px] h-[25px] mr-[5px]"
                                        src="img/estrela-preenchida.png"
                                        alt="Estrela"
                                    />
                                    <h5 className="text-[#9D9393] mt-2">03/03/2025</h5>
                                </div>
                            </div>
                            <h4 className="mb-0">Pizzaria super aconchegante!</h4>
                        </div>
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
        </div>
    );

};


export default ProfilePage;

const styles = {
    fadeIn: {
        animation: "1.5s fadeInUp",
    }
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
