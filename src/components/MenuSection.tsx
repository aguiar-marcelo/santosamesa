"use client";
import React from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const MenuSection = () => {
    const { user, token, signOut } = useAuth();
    return (
        <>
            <div className="flex flex-col items-center mx-8">
                <div className="w-full flex justify-between gap-4 p-4 items-center">
                    <div className="flex justify-center items-center gap-2">
                        <img src="img/img-logo.png" alt="Logo" width={45} height={40} />
                        <h1 className="text-white text-2xl font-bold">SANTOS À MESA</h1>
                    </div>

                    <div className="flex justify-center rounded-lg overflow-hidden">
                        <Link
                            href="/"
                            className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/local"
                            className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300"
                        >
                            Ver Localidades
                        </Link>
                        <Link
                            href="/"
                            className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300"
                        >
                            Destaques
                        </Link>
                        <Link
                            href="/"
                            className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300"
                        >
                            Perguntas Frequentes
                        </Link>
                        <Link
                            href="/sobreNos"
                            className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300"
                        >
                            Sobre Nós
                        </Link>
                    </div>

                    <div className="flex justify-center gap-4 items-center">
                        {user && token ? (
                            <div className="flex gap-3">
                                <Link href="/perfil" className="text-white hover:underline"> {/* Adicionado text-white aqui */}
                                    <User />
                                </Link>
                                <span className="text-white">{user.email}</span>
                                <button className="text-white hover:text-red-700" onClick={signOut}> {/* Adicionado text-white aqui */}
                                    <LogOut />
                                </button>
                            </div>
                        ) : (
                            <>
                                {" "}
                                <Link href="/login" className="text-white underline">
                                    Login
                                </Link>
                                <Link
                                    href="/cadastro"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Cadastrar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuSection;