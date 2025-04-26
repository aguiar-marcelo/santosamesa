"use client";
import React from "react";
import { Search } from "lucide-react";
import SectionMenu from "./SectionMenu";
import SectionFooter from "./SectionFooter";
import './css/HomePage.css';
import SectionCarousel from "./SectionCarousel";

const HomePage = () => {
  return (
    <div className="home-container background">
      <div className="home-header-bg background">
        <SectionMenu />
        <div className="home-hero">
          <div className="home-hero-content">
            <div className="home-hero-inner">
              <h2 className="home-hero-title">
                Descubra lugares incríveis para comer em Santos
              </h2>
              <div className="home-search-container">
                <input
                  type="text"
                  placeholder="Descubra restaurantes, cafés..."
                  className="home-search-input"
                />
                <button className="home-search-button bg-primary">
                  <Search /> Pesquisar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-rated-title-container">
          <h2 className="home-rated-title">Melhores avaliados</h2>
        </div>

        <SectionCarousel />

        <div className="home-rated-title-container">
          <h2 className="home-rated-title">Destaques da semana</h2>
        </div>

        <SectionCarousel />

        <div className="home-rated-title-container">
          <h2 className="home-rated-title">Recomendações</h2>
        </div>

        <SectionCarousel />

      </div>
      <SectionFooter />
    </div>
  );
};

export default HomePage;