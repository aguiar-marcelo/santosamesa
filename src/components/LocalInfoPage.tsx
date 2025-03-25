"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LocalData {
    id: string;
    name: string;
    url_img: string;
    aboutUs: string;
}

interface User {
    email: string;
}

interface Avaliacao {
    id: string;
    value: number;
    restaurantId: string;
    userId: string;
    comments: { message: string }[];
    createdAt: string;
    user?: { id: string };
}

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const LocalInfoPage = ({ data, setData }: { data: LocalData | undefined; setData?: any }) => {
    const [comentario, setComentario] = useState<string>("");
    const [estrelas, setEstrelas] = useState<number>(0);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

    const { user } = useAuth() as { user: User, token: string };

    async function enviarAvaliacao() {
        try {
            const response = await fetch(`${apiBaseUrl}/rating`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: estrelas,
                    restaurantId: data?.id,
                    userId: user.email,
                    comments: comentario ? [{ text: comentario }] : [],
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao enviar avaliação: ${response.status}`);
            }

            const novaAvaliacao: Avaliacao = await response.json();
            console.log("Avaliação enviada:", novaAvaliacao);

            buscarAvaliacoes();
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    async function buscarAvaliacoes() {
        try {
            const response = await fetch(`${apiBaseUrl}/rating`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar avaliações: ${response.status}`);
            }

            const dataResponse: Avaliacao[] = await response.json();
            const avaliacoesFiltradas: Avaliacao[] = dataResponse.filter(
                (avaliacao: Avaliacao) => avaliacao.restaurantId === data?.id
            );
            setAvaliacoes(avaliacoesFiltradas);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    useEffect(() => {
        if (data && data.id) {
            buscarAvaliacoes();
        }
    }, [data]);

    return (
        <div>
            <div className="relative w-full h-full">
                <div className="relative bg-cover bg-center h-[350px] w-full overflow-hidden">
                    <img src={data?.url_img} alt="Local" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
                </div>
            </div>
            <div className="flex">
                <div className="w-[60%] ml-[70px] mr-[70px] mt-5">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <button onClick={() => setData(undefined)} className="text-gray-500"><ArrowLeft /></button>
                            <h1 className="my-[4px] mx-4 font-bold">{data?.name}</h1>
                            {Array(4).fill(0).map((_, starIndex) => (
                                <img
                                    key={starIndex}
                                    className="w-[35px] h-[35px]"
                                    src="img/estrela-preenchida.png"
                                    alt="Estrela"
                                />
                            ))}
                        </div>
                        <h4 className="text-[#9D9393] mt-0">
                            {avaliacoes.length} avaliações
                        </h4>
                    </div>

                    <div>
                        <h4>{data?.aboutUs}</h4>
                    </div>

                    <div>
                        <h2 className="mb-5 mt-10 font-bold">Avaliações</h2>
                    </div>

                    <div>
                        {avaliacoes.map((avaliacao, index) => (
                            <div
                                key={avaliacao.id}
                                className={`border-2 border-[#666565] rounded-lg p-4 mt-[15px] ${index === avaliacoes.length - 1 && !data?.id ? 'mb-[1rem]' : 'mb-[15px]'}`}
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
                                                <h3 className="font-semibold my-0 whitespace-nowrap mr-2">
                                                    {avaliacao.user && avaliacao.user.id ? `Avaliado por ${avaliacao.user.id}` : 'Usuário Anônimo'}
                                                </h3>
                                                {Array(avaliacao.value)
                                                    .fill(0)
                                                    .map((_, starIndex) => (
                                                        <img
                                                            key={starIndex}
                                                            className="w-[25px] h-[25px]"
                                                            src="img/estrela-preenchida.png"
                                                            alt="Estrela"
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                        <h5 className="text-[#9D9393] mt-1 text-sm whitespace-nowrap">
                                            {new Date(avaliacao.createdAt).toLocaleDateString()}
                                        </h5>
                                    </div>
                                </div>
                                <h4 className="my-0 mt-2">{avaliacao.comments[0]?.message}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[40%] ml-[70px] mr-[70px] mt-5">
                    <div className="rounded-lg p-8" style={{ background: 'linear-gradient(to bottom, #A0E4FF, #74a5ed)' }}>
                        <h2 className="mb-6 mt-[4px] font-bold">Deixe sua avaliação!</h2>
                        <textarea
                            placeholder="Digite sua avaliação aqui..."
                            className="w-full px-2 py-2 rounded-md border border-black text-black placeholder-black bg-transparent resize-none overflow-hidden"
                            rows={6}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = "auto";
                                target.style.height = `${target.scrollHeight}px`;
                                setComentario(target.value);
                            }}
                        ></textarea>

                        <div className="flex flex-row mt-3">
                            {Array(5)
                                .fill(0)
                                .map((_, starIndex) => (
                                    <img
                                        key={starIndex}
                                        className="w-[35px] h-[35px]"
                                        src={
                                            starIndex < estrelas
                                                ? "img/estrela-preenchida.png"
                                                : "img/estrela.png"
                                        }
                                        alt="Estrela"
                                        onClick={() => setEstrelas(starIndex + 1)}
                                    />
                                ))}
                        </div>
                        <button
                            className="bg-[#2ca1d4] text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 w-full justify-center mt-6"
                            onClick={enviarAvaliacao}
                        >
                            Enviar Avaliação
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '3rem' }}></div>
        </div>
    );
};

export default LocalInfoPage;