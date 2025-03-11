"use client";
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const SobreNosPage = () => {
    const logado = false; // alterar

    return (
        <div className="relative w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #E05F30, #7f3815)' }}>
            <div className="bg-cover bg-center h-[350px] w-full">
                <div className="flex flex-col items-center">
                    <div className="w-full flex justify-between gap-4 p-4 items-center">
                        <div className="flex justify-center items-center gap-2">
                            <img src="img/img-logo.png" alt="Logo" width={45} height={40} />
                            <h1 className="text-white text-2xl font-bold">SANTOS À MESA</h1>
                        </div>

                        <div className="flex justify-center rounded-lg overflow-hidden">
                            <Link href="/" className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                Home
                            </Link>
                            {['Ver Localidades', 'Destaques', 'Perguntas Frequentes', 'Sobre Nós'].map((item, index) => (
                                <button key={index} className="bg-gray-200 border border-gray-400 text-black px-5 py-3 hover:bg-gray-300">
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div id="login-container" style={{ display: logado ? 'none' : 'block' }}>
                            <div className="flex justify-center gap-4">
                                <Link href="/login" className="text-white underline">
                                    Login
                                </Link>
                                <Link href="/cadastro" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Cadastrar
                                </Link>
                            </div>
                        </div>

                        <div id="usuario-logado" style={{ display: logado ? 'block' : 'none' }}>
                            <div className="justify-center gap-5" style={{ alignItems: 'center' }}>
                                <img className="imagem-perfil" src="img/placeholder-perfil.png" alt="Foto de Perfil" />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p style={{ color: 'white', marginBottom: '2px', marginTop: '2px' }}>User Teste</p>
                                    <a style={{ color: 'white' }} href="perfil.html">Ver Perfil</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="center-container main-content">
                        <div className="center-container" style={{ marginTop: '72px' }}>
                            <h2 style={{ marginBottom: '0' }}>Sobre Nós</h2>
                            <h4>Conectando santistas e turistas para as melhores experiências gastronômicas desde 2025</h4>
                        </div>

                        <div className="grid-container-1">
                            <div className="center-container section">
                                <div>
                                    <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Nossa missão</h3>
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
                                    <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Nossa história</h3>
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
                            <h2 style={{ marginBottom: '0' }}>Nosso valores</h2>
                            <h4>Princípios que guiam o nosso trabalho</h4>
                        </div>

                        <div className="grid-container-2" style={{ marginBottom: '72px' }}>
                            <div className="center-container section">
                                <div>
                                    <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Autenticidade</h3>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Valorizamos experiências genuínas e avaliações honestas. Nosso compromisso é com a verdade, mesmo
                                        quando ela não é perfeita.
                                    </h5>
                                </div>
                            </div>

                            <div className="center-container section">
                                <div>
                                    <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Comunidade</h3>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Acreditamos no poder da inteligência coletiva. Nossa plataforma é construída pela comunidade e para a
                                        comunidade.
                                    </h5>
                                </div>
                            </div>

                            <div className="center-container section">
                                <div>
                                    <h3 style={{ marginTop: '0', marginBottom: '3px' }}>Diversidade</h3>
                                    <h5 style={{ marginBottom: '0' }}>
                                        Celebramos a rica diversidade gastronômica de Santos, desde a tradicional comida caiçara até as mais
                                        recentes inovações culinárias.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="bg-[#247895] w-full absolute bottom-0 text-center  text-white pt-8">
                    <h3 className="text-lg font-bold">SANTOS À MESA</h3>
                    <p>©2025, Santos à Mesa. Todos os direitos reservados.</p>
                    <Image src={"/img/img-mureta.png"} width="1000" height="1000" className="w-full" alt="muretas-santos" />
                </footer>
            </div>




            <style jsx>{`
                .form-container {
                    position: relative;
                    min-height: 100vh;
                }

                .form {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin-top: -40px;
                    background-image: linear-gradient(to right, #E05F30, #7f3815);
                }

                .imagem-perfil {
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border: 2px solid rgba(255, 255, 255, 0.500);
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: 22% 55% 21%;
                    grid-gap: 1%;
                    padding: 10px;
                    align-items: center;
                    margin-left: 12px;
                    margin-right: 12px;
                }

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

                .bottom-row {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #333;
                }
                
                .footer-text {
                    color: rgb(232, 232, 236);
                    padding: 15px;
                }

                .btn-menu, .btn-style, .txt-login {
                    background-color: white;
                    border: none;
                    padding: 10px 15px;
                    margin: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    color: black;
                }

                .btn-style {width: 45%;
                    padding: 15px;
                    text-align: center;
                    text-decoration: none;
                }

                .btn-menu {
                    background-color: white;
                    border: none;
                    padding: 10px 15px;
                    margin: 5px;
                    cursor: pointer;
                    text-decoration: none;
                    color: black;
                }

                .btn-border-start {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                }

                .btn-border-end {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }

                .txt-login {
                    text-decoration: none;
                    color: black;
                }

                .justify-center {
                    display: flex;
                    justify-content: center;
                }

                .gap-5 {
                    gap: 5%;
                }

                .row {
                    display: flex;
                    flex-direction: row;
                }
                
                .img-mureta {
                    width: 100%;
                    height: 100px;
                    background-image: url('img/img-mureta.png');
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            `}</style>
        </div >
    );
};

export default SobreNosPage;