"use client"
import React from "react";
import { ArrowLeft } from "lucide-react";

const LocalInfoPage = ({ data, setData }: { data?: any; setData?: any }) => {
    return (
        <div>
            <div className="relative w-full h-full">
                <div className="relative bg-cover bg-center h-[350px] w-full overflow-hidden">
                    <img src={data.url_img} alt="Local" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
                </div>
            </div>
            <div className="flex">
                <div className="w-[60%] ml-[70px] mr-[70px] mt-5">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <button onClick={() => setData(undefined)} className="text-gray-500"><ArrowLeft /></button>
                            <h1 className="my-[4px] mx-4 font-bold">{data.name}</h1>
                            {Array(4).fill(0).map((_, starIndex) => (
                                <img
                                    key={starIndex}
                                    className="w-[35px] h-[35px]"
                                    src="img/estrela-preenchida.png"
                                    alt="Estrela"
                                />
                            ))}
                        </div>
                        <h4 className="text-[#9D9393] mt-0">4 avaliações</h4>
                    </div>


                    <div>
                        <h4>{data.aboutUs}</h4>
                    </div>

                    <div>
                        <h2 className="mb-5 mt-10 font-bold">Avaliações</h2>
                    </div>

                    <div>
                        {Array(4).fill(0).map((_, index, array) => (
                            <div
                                key={index}
                                className={`border-2 border-[#666565] rounded-lg p-4 mt-[15px] ${index === array.length - 1 ? 'mb-[15px]' : ''
                                    }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        className="rounded-full w-[50px] h-[50px] object-cover"
                                        src="img/placeholder-perfil.png"
                                        alt="Foto de Perfil"
                                    />
                                    <div className="flex-1 ml-[10px]">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <h3 className="font-semibold my-0 whitespace-nowrap mr-2">Avaliado por User Teste</h3>
                                                {Array(3).fill(0).map((_, starIndex) => (
                                                    <img
                                                        key={starIndex}
                                                        className="w-[25px] h-[25px]"
                                                        src="img/estrela-preenchida.png"
                                                        alt="Estrela"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <h5 className="text-[#9D9393] mt-1 text-sm whitespace-nowrap">02/03/2025</h5>
                                    </div>
                                </div>
                                <h4 className="my-0 mt-2">A cerveja é ótima! O atendimento nem tanto...</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[40%] ml-[70px] mr-[70px] mt-5">
                    <div className="rounded-lg p-8" style={{ backgroundColor: '#b6defc' }}>
                        <h2 className="mb-6 mt-[4px] font-bold">Deixe sua avaliação!</h2>
                        <textarea
                            placeholder="Digite sua avaliação aqui..."
                            className="w-full px-2 py-2 rounded-md border border-black text-black placeholder-black bg-transparent resize-none overflow-hidden"
                            rows={6}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        ></textarea>
                        <h3 className="mb-2">Selecione a quantidade de estrelas que gostaria de dar a esse local:</h3>
                        <div className="flex flex-row">
                            {Array(5).fill(0).map((_, starIndex) => (
                                <img
                                    key={starIndex}
                                    className="w-[35px] h-[35px]"
                                    src="img/estrela.png"
                                    alt="Estrela"
                                />
                            ))}
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 w-full justify-center mt-6">
                            Enviar Avaliação
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};


export default LocalInfoPage;