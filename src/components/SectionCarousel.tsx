"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./css/SectionCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Bookmark, Heart } from "lucide-react";
import {
  deleteLocalFavorite,
  getLocalsFavorites,
  postLocalFavorite,
} from "@/services/routes";
import { useAuth } from "@/context/AuthContext";

export type Place = {
  name: string;
  link: string;
  category?: { name?: string };
  url_img?: string;
  averageRating?: number;
  aboutUs?: string;
  id: number;
};

const SectionCarousel = ({ places }: { places: Place[] }) => {
  const { user } = useAuth();
  const [restaurantsFavorites, setRestaurantsFavorites] = React.useState<any[]>(
    []
  );
  const AddFavorite = async (restaurantId: number) => {
    if (!user?.id || !restaurantId) return;
    try {
      await postLocalFavorite(restaurantId, user.id);
      FetchFavorites();
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
    }
  };

  const RemoveFavorite = async (restaurantId: number) => {
    if (!user?.id || !restaurantId) return;
    try {
      await deleteLocalFavorite(restaurantId, user.id);
      FetchFavorites();
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
    }
  };
  const FetchFavorites = async () => {
    if (!user?.id) return;
    try {
      const results: any[] = await getLocalsFavorites(user.id);
      setRestaurantsFavorites(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
      setRestaurantsFavorites([]);
    }
  };

  useEffect(() => {
    FetchFavorites();
  }, []);
  
  return (
    <div className="w-[90%] mx-auto py-8">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={0}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className=""
      >
        {places.map((place, index) => (
          <SwiperSlide key={index}>
            <div className="home-carousel-card m-auto">
              {place.url_img && (
                <img
                  src={place.url_img}
                  alt={place.name}
                  className="home-carousel-image"
                />
              )}
              <div className="home-carousel-info">
                <div>
                  <div className="space-between">
                    <h3 className="home-carousel-title">{place.name}</h3>
                    <button
                      className="group"
                      onClick={() =>
                        restaurantsFavorites.find(
                          (r) => r.restaurantId == +place.id
                        )
                          ? RemoveFavorite(+place.id)
                          : AddFavorite(+place.id)
                      }
                    >
                      <Heart
                        fill={
                          restaurantsFavorites.find(
                            (r) => r.restaurantId == +place.id
                          )
                            ? "#ff0000"
                            : "#fff"
                        }
                        className="text-gray-500 group-hover:text-red-700 transition-colors duration-300"
                      />
                    </button>
                  </div>
                  {place.category?.name && (
                    <p className="home-carousel-category">
                      {place.category.name}
                    </p>
                  )}
                  {place.averageRating !== undefined && (
                    <div className="home-carousel-rating">
                      {Array(Math.round(place.averageRating))
                        .fill(0)
                        .map((_, starIndex) => (
                          <img
                            key={`filled-${place.id}-${starIndex}`}
                            className="home-carousel-star"
                            src="/img/estrela-preenchida.png"
                            alt="Estrela"
                          />
                        ))}
                    </div>
                  )}
                  <p className="home-carousel-description">{place.aboutUs}</p>
                </div>
                <Link
                  href={`/local-info/${place.id}`}
                  className="home-carousel-link bg-primary"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionCarousel;
