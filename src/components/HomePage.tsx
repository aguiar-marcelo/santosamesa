"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import SectionMenu from "./SectionMenu";
import SectionFooter from "./SectionFooter";
import "./css/HomePage.css";
import SectionCarousel, { Place } from "./SectionCarousel";
import {
  getRestaurantsHighlightsWeek,
  getRestaurantsRecommendations,
  getRestaurantsTopRated,
} from "@/services/routes";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const HomePage = () => {
  const { user } = useAuth();
  const [restaurantsTopRated, setRestaurantsTopRated] = useState<Place[]>([]);
  const [restaurantsHighlightsWeek, setRestaurantsHighlightsWeek] = useState<
    Place[]
  >([]);
  const [restaurantsRecommendations, setRestaurantsRecommendations] = useState<
    Place[]
  >([]);

  const FetchTopRated = async () => {
    try {
      const results: Place[] = await getRestaurantsTopRated();
      setRestaurantsTopRated(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
    }
  };

  const FetchHighlightsWeek = async () => {
    if (!user?.id) return;
    try {
      const results: Place[] = await getRestaurantsHighlightsWeek(user?.id);
      setRestaurantsHighlightsWeek(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
    }
  };

  const FetchRecommendations = async () => {
    if (!user?.id) return;
    try {
      const results: Place[] = await getRestaurantsRecommendations(user?.id);
      setRestaurantsRecommendations(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
    }
  };

  useEffect(() => {
    FetchTopRated();
    FetchHighlightsWeek();
    FetchRecommendations();
  }, [user]);

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
                <div className="home-search-button bg-primary">
                  <Link href="/local" style={{ color: "white"}}> Explorar locais </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {restaurantsTopRated.length > 0 && (
          <>
            <div className="home-rated-title-container">
              <h2 className="home-rated-title">Melhores avaliados</h2>
            </div>

            <SectionCarousel places={restaurantsTopRated} />
          </>
        )}
        {restaurantsHighlightsWeek.length > 0 && (
          <>
            <div className="home-rated-title-container">
              <h2 className="home-rated-title">Destaques da semana</h2>
            </div>

            <SectionCarousel places={restaurantsHighlightsWeek} />
          </>
        )}
        {restaurantsRecommendations.length > 0 && (
          <>
            <div className="home-rated-title-container">
              <h2 className="home-rated-title">Recomendações</h2>
            </div>

            <SectionCarousel places={restaurantsRecommendations} />
          </>
        )}
      </div>
      <div style={{ marginTop: "50px"}}></div>
      <SectionFooter />
    </div>
  );
};

export default HomePage;
