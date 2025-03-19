'use client';
import React from 'react';
import MenuSection from './MenuSection';
import FooterSection from './FooterSection';

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

    return (
        <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundImage: 'linear-gradient(to right, #E05F30, #7f3815)' }}>
            <MenuSection />
            <div className="flex flex-col items-center mx-8 flex-grow">
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
            <FooterSection/>

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