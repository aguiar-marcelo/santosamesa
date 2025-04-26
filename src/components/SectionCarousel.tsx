"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import './css/SectionCarousel.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Place = {
    name: string;
    link: string;
    category?: { name?: string };
    img?: string;
    averageRating?: number;
    aboutUs?: string;
    id?: number;
};

const SectionCarousel: React.FC = () => {
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        const topRatedPlacesData = [
            {
                name: "Burgman",
                link: "/local-info/burgman",
                category: { name: "Bar" },
                img: "img/img-placeholder-2.jpg",
            },
            {
                name: "Padrela",
                link: "/local-info/padrela",
                category: { name: "Padaria" },
                img: "img/img-placeholder-3.jpg",
            },
            {
                name: "Van Gogh",
                link: "/local-info/vangogh",
                category: { name: "Pizzaria" },
                img: "img/img-placeholder-4.png",
            },
        ];

        setPlaces(topRatedPlacesData);
    }, []);

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        swipeToSlide: true,
        arrows: true,
        afterChange: function (index: number) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "0px",
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "0px",
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "0px",
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="home-carousel-container"> {/* Container geral */}
            <div className="home-carousel-grid"> {/* Container para o grid */}
                <Slider {...settings}>
                    {places.map((place, index) => (
                        <div key={index} className="home-carousel-slide"> {/* Cada slide do Slider */}
                            <div className="home-carousel-card"> {/* Seu card estilizado */}
                                {place.img && (
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="home-carousel-image"
                                    />
                                )}
                                <div className="home-carousel-info">
                                    <div>
                                        <h3 className="home-carousel-title">{place.name}</h3>
                                        {place.category?.name && (
                                            <p className="home-carousel-category">{place.category.name}</p>
                                        )}
                                        {place.averageRating !== undefined && (
                                            <div className="home-carousel-rating">
                                                {Array(Math.round(place.averageRating)).fill(0).map((_, starIndex) => (
                                                    <img key={`filled-${place.id}-${starIndex}`} className="home-carousel-star" src="/img/estrela-preenchida.png" alt="Estrela" />
                                                ))}
                                            </div>
                                        )}
                                        <p className="home-carousel-description">{place.aboutUs}</p>
                                    </div>
                                    {place.link && (
                                        <Link href={place.link} className="home-carousel-link bg-primary">
                                            Saiba mais
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SectionCarousel;