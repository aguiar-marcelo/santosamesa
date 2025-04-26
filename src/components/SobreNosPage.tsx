'use client';
import React from 'react';
import SectionMenu from './SectionMenu';
import SectionFooter from './SectionFooter';
import './css/SobreNosPage.css'

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
    <div className="sobre-nos-container">
      <SectionMenu />
      <div className="sobre-nos-content background">
        <div className="sobre-nos-inner-container" style={{ marginTop: '70px' }} >
          <h2 className='sobre-nos-title'>Sobre Nós</h2>
          <h4 className='sobre-nos-subtitle'>Conectando santistas e turistas para as melhores experiências gastronômicas desde 2025</h4>
        </div>

        <div className="sobre-nos-grid-container-1 " style={{ ...styles.fadeIn }}>
          <div className="sobre-nos-inner-container sobre-nos-section" style={{ backgroundColor: "white" }}>
            <div>
              <h3 className='sobre-nos-section-title'>Nossa missão</h3>
              <h4 className='sobre-nos-section-subtitle'>O que nos motiva</h4>
              <h5 className='sobre-nos-section-text'>
                Conectar pessoas e incentivar o descobrimento de novas experiências gastronômicas da cidade de Santos,
                incentivando o turismo. Acreditamos que não há coisa mais valiosa que descobrir o novo e criar novas
                memórias no processo.
              </h5>
            </div>
          </div>

          <div className="sobre-nos-inner-container sobre-nos-section" style={{ backgroundColor: "white" }}>
            <div>
              <h3 className='sobre-nos-section-title'>Nossa história</h3>
              <h4 className='sobre-nos-section-subtitle'>Como começou</h4>
              <h5 className='sobre-nos-section-text'>
                O projeto Santos à Mesa surgiu como o trabalho de conclusão de curso de 7 estudantes da Universidade
                Santa Cecília, que tinham muito carinho pela cidade de Santos e queriam incentivar mais as pessoas a
                explorarem mais do que a cidade tinha para oferecer, focando na facilidade do processo.
              </h5>
            </div>
          </div>
        </div>

        <div className="sobre-nos-inner-container">
          <h2 className='sobre-nos-values-title'>Nosso valores</h2>
          <h4 className='sobre-nos-values-subtitle'>Princípios que guiam o nosso trabalho</h4>
        </div>

        <div className="sobre-nos-grid-container-2 sobre-nos-values-grid" style={{ marginBottom: '60px', ...styles.fadeIn }}>
          <div className="sobre-nos-inner-container sobre-nos-section" style={{ backgroundColor: "white" }}>
            <div>
              <h3 className='sobre-nos-section-title'>Autenticidade</h3>
              <h5 className='sobre-nos-section-text'>
                Valorizamos experiências genuínas e avaliações honestas. Nosso compromisso é com a verdade, mesmo
                quando ela não é perfeita.
              </h5>
            </div>
          </div>

          <div className="sobre-nos-inner-container sobre-nos-section" style={{ backgroundColor: "white" }}>
            <div>
              <h3 className='sobre-nos-section-title'>Comunidade</h3>
              <h5 className='sobre-nos-section-text'>
                Acreditamos no poder da inteligência coletiva. Nossa plataforma é construída pela comunidade e para a
                comunidade.
              </h5>
            </div>
          </div>

          <div className="sobre-nos-inner-container sobre-nos-section" style={{ backgroundColor: "white" }}>
            <div>
              <h3 className='sobre-nos-section-title'>Diversidade</h3>
              <h5 className='sobre-nos-section-text'>
                Celebramos a rica diversidade gastronômica de Santos, desde a tradicional comida caiçara até as mais
                recentes inovações culinárias.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <SectionFooter />

      <style>{fadeInUpKeyframes}</style>
    </div >
  );
};

export default SobreNosPage;