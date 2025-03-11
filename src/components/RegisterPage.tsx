"use client"
import Link from 'next/link';
import { useState } from 'react';

const Cadastro = () => {
    const [etapa, setEtapa] = useState(1);

    const proximaEtapa = () => {
        setEtapa(2);
    };

    const etapaAnterior = () => {
        setEtapa(1);
    };

    return (
        <div className="h-screen flex flex-col justify-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(img/img-login.jpg)' }}>
            <form className="flex justify-center items-center h-full">
                <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                    {etapa === 1 ? (
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-semibold mt-6 mb-4">Cadastro</h2>
                            <progress className="w-4/5 mb-4" max="100" />
                            <p className="w-4/5 mb-2 text-left">Nome de usuário *</p>
                            <input type="text" placeholder="Digite seu nome de usuário" className="w-4/5 p-3 border-4 border-gray-200 rounded-lg mb-4" />
                            <p className="w-4/5 mb-2 text-left">Endereço de e-mail *</p>
                            <input type="email" placeholder="Digite seu e-mail" className="w-4/5 p-3 border-4 border-gray-200 rounded-lg mb-4" />
                            <p className="w-4/5 mb-2 text-left">Crie sua senha *</p>
                            <input type="password" placeholder="Digite a senha que deseja criar" className="w-4/5 p-3 border-4 border-gray-200 rounded-lg mb-4" />
                            {/* <p className="w-4/5 mb-2 text-left">Confirme sua senha *</p>
                            <input type="password" placeholder="Digite sua senha novamente" className="w-4/5 p-3 border-4 border-gray-200 rounded-lg mb-6" /> */}
                            <div className="flex gap-5 w-4/5 justify-between">
                                <Link href="/" className="text-gray-500">Voltar</Link>
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600"
                                    onClick={proximaEtapa}
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-semibold mt-6 mb-4">Cadastro</h2>
                            <progress className="w-4/5 mb-4" max="100" />
                            <p className="w-4/5 mb-2 text-left">Nome de exibição *</p>
                            <input type="text" placeholder="Digite o nome a ser apresentado" className="w-4/5 p-3 border-4 border-gray-200 rounded-lg mb-4" />
                            <p className="w-4/5 mb-2 text-left">Selecione sua foto de perfil</p>
                            <input type="file" accept="image/png, image/jpeg" className="w-4/5 mb-4" />
                            <div className="flex flex-col items-center w-4/5 gap-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 w-full"
                                >
                                    CADASTRAR
                                </button>
                                <a
                                    href="#"
                                    onClick={etapaAnterior}
                                    className="text-gray-500 bg-gray-200 py-3 px-6 rounded-lg w-full text-center"
                                >
                                    Voltar
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
