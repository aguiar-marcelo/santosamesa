'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SobreNosPage = () => {
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

    const logado = true; // alterar

    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const hoverRef = useRef<HTMLDivElement | null>(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsHovered(true);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && e.target instanceof Node && !popupRef.current.contains(e.target)) {
                setIsOpen(false);
                setIsHovered(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <div className="relative w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #E05F30, #7f3815)' }}>
            <div className="bg-cover bg-center h-[350px] w-full" >
                <div className="flex flex-col items-center mx-8">
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

                        {/* <div className="flex justify-center gap-4 items-center">
                            <Link href="/login" className="text-white underline">
                                Login
                            </Link>
                            <Link href="/cadastro" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Cadastrar
                            </Link>
                        </div> */}

                        <div className="relative">
                            <div
                                ref={hoverRef}
                                className={`flex items-center cursor-pointer transition-colors duration-300 rounded-t-md p-2 ${isHovered ? 'bg-[#62A4BE]' : ''}`}
                                onClick={togglePopup}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => {
                                    if (!isOpen) {
                                        setIsHovered(false);
                                    }
                                }}
                            >
                                <img
                                    className="rounded-full w-12 h-12 mr-4"
                                    src="img/placeholder-perfil.png"
                                    alt="Foto de Perfil"
                                    style={{ border: '2px solid rgba(255, 255, 255, 0.5)' }}
                                />
                                <p className="text-white">User Teste</p>
                            </div>
                            <div
                                ref={popupRef}
                                className={`absolute top-full left-0 bg-[#62A4BE] p-2 rounded-b-md z-10 ${isOpen ? 'block' : 'hidden'} w-full`} // Adicionado w-full
                                style={{ width: hoverRef.current ? `${hoverRef.current.clientWidth}px` : 'auto' }}
                            >
                                <div className="flex flex-col items-center"> {/* Adicionado flex flex-col items-center */}
                                    <Link href="/perfil" className="block text-white mb-2 hover:bg-[#426b7b] w-full text-center">Ver Perfil</Link>
                                    <button className="block text-white hover:bg-[#4D7787] w-full text-center">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="center-container main-content">
                        <div className="center-container" style={{ marginTop: '70px' }} >
                            <h2 className='my-0 font-bold'>Sobre Nós</h2>
                            <h4 className='mt-2'>Conectando santistas e turistas para as melhores experiências gastronômicas desde 2025</h4>
                        </div>

                        <div className="grid-container-1" style={{ ...styles.fadeIn }}>
                            <div className="center-container section">
                                <div>
                                    <h3 className='mt-0 mb-3 font-bold'>Nossa missão</h3>
                                    <h4 style={{ marginTop: '0' }}>O que nos motiva</h4>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Conectar pessoas e incentivar o descobrimento de novas experiências gastronômicas da cidade de Santos,
                                        incentivando o turismo. Acreditamos que não há coisa mais valiosa que descobrir o novo e criar novas
                                        memórias no processo.
                                    </h5>
                                </div>
                            </div>

                            <div className="center-container section">
                                <div>
                                    <h3 className='mt-0 mb-3 font-bold'>Nossa história</h3>
                                    <h4 style={{ marginTop: '0' }}>Como começou</h4>
                                    <h5 style={{ marginBottom: '0' }}>
                                        O projeto Santos à Mesa surgiu como o trabalho de conclusão de curso de 7 estudantes da Universidade
                                        Santa Cecília, que tinham muito carinho pela cidade de Santos e queriam incentivar mais as pessoas a
                                        explorarem mais do que a cidade tinha para oferecer, focando na facilidade do processo.
                                    </h5>
                                </div>
                            </div>
                        </div>

                        <div className="center-container">
                            <h2 className='mt-10 mb-0 font-bold'>Nosso valores</h2>
                            <h4 className='mt-2'>Princípios que guiam o nosso trabalho</h4>
                        </div>

                        <div className="grid-container-2" style={{ marginBottom: '60px', ...styles.fadeIn }}>
                            <div className="center-container section">
                                <div>
                                    <h3 className='mt-0 mb-3 font-bold'>Autenticidade</h3>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Valorizamos experiências genuínas e avaliações honestas. Nosso compromisso é com a verdade, mesmo
                                        quando ela não é perfeita.
                                    </h5>
                                </div>
                            </div>

                            <div className="center-container section">
                                <div>
                                    <h3 className='mt-0 mb-3 font-bold'>Comunidade</h3>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Acreditamos no poder da inteligência coletiva. Nossa plataforma é construída pela comunidade e para a
                                        comunidade.
                                    </h5>
                                </div>
                            </div>

                            <div className="center-container section">
                                <div>
                                    <h3 className='mt-0 mb-3 font-bold'>Diversidade</h3>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Celebramos a rica diversidade gastronômica de Santos, desde a tradicional comida caiçara até as mais
                                        recentes inovações culinárias.
                                    </h5>
                                </div>
                            </div>
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

            <style>{fadeInUpKeyframes}</style>

            <style jsx>{`
                .grid-container-1, .grid-container-2 {
                    display: grid;
                    grid-template-columns: 47.5% 47.5%;
                    grid-gap: 5%;
                    padding: 10px;
                    padding-left: 40px;
                    padding-right: 40px;
                    align-items: center;
                    margin-left: 12px;
                    margin-right: 12px;
                }
                .grid-container-2 {
                    grid-template-columns: repeat(3, 1fr);
                }
                .center-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }  
                .main-content {
                    background-color: white;
                    margin-left: 20px;
                    margin-right: 20px;
                    margin-bottom: 40px;
                    border-radius: 8px;
                }
                .section {
                    border: 2px solid #666565;
                    border-radius: 8px;
                    padding: 30px;
                    height: -webkit-fill-available;
                }
                .h3, h4, h5 {
                    color: #636363;
                }
            `}</style>
        </div >
    );
};

export default SobreNosPage;