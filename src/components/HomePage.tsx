"use client";
import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import SectionMenu from "./SectionMenu";
import SectionFooter from "./SectionFooter";
import './css/HomePage.css';


const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-header-bg">
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
                <button className="home-search-button">
                  <Search /> Pesquisar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-rated-title-container">
          <h2 className="home-rated-title">Melhores avaliados</h2>
        </div>

        <div className="home-places-grid">
          {[
            {
              name: "Burgman",
              category: "Bar",
              img: "img/img-placeholder.jpg",
            },
            {
              name: "Padrela",
              category: "Padaria",
              img: "img/img-placeholder-2.jpg",
            },
            {
              name: "Van Gogh",
              category: "Pizzaria",
              img: "img/img-placeholder-3.jpg",
            },
          ].map((place, index) => (
            <div key={index} className="home-place-card">
              <img
                src={place.img}
                alt={place.name}
                className="home-place-image"
              />
              <div className="home-place-info">
                <b className="home-place-name">{place.name}</b>
                <p className="home-place-category">{place.category}</p>
                <Link
                  href="/local-info"
                  className="home-place-link"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionFooter />
    </div>
  );
};

export default HomePage;