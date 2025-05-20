"use client";
import React from "react";
import { Heart, Search } from "lucide-react";
import {
  deleteLocalFavorite,
  getCategories,
  getLocalsFavorites,
  postLocalFavorite,
} from "@/services/routes";
import Link from "next/link"; // Importe o Link do next/link
import { Loader2 } from "lucide-react";
import SectionFooter from "./SectionFooter";
import SectionMenu from "./SectionMenu";
import SectionFilterCategory from "@/components/SectionFilterCategory";
import "./css/LocalPage.css";
import { OrbitProgress } from "react-loading-indicators";
import { useAuth } from "@/context/AuthContext";

const LocalPage = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [restaurantsFavorites, setRestaurantsFavorites] = React.useState<any[]>(
    []
  );

  const [visibleRestaurants, setVisibleRestaurants] = React.useState<
    Restaurant[]
  >([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<
    Restaurant[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([
    "Todos",
  ]);
  const [selectedRatings, setSelectedRatings] = React.useState<number[]>([]);

  console.log(
    "LocalPage rendered. selectedCategories:",
    selectedCategories,
    "selectedRatings:",
    selectedRatings
  );

  const FetchRestaurants = async (page = 1, limit = 8, append = false) => {
    setLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/restaurant?page=${page}&limit=${limit}`;

      const params: string[] = [];

      if (!selectedCategories.includes("Todos")) {
        selectedCategories.forEach((selectedCategoryName) => {
          const category = categories.find(
            (cat) =>
              cat.name?.toLowerCase() === selectedCategoryName.toLowerCase()
          );
          if (category?.id) {
            params.push(`categoryId=${category.id}`);
          }
        });
      }

      if (selectedRatings.length > 0) {
        const ratingsParam = selectedRatings
          .map((rating) => `ratings=${rating}`)
          .join("&");
        if (ratingsParam) {
          params.push(ratingsParam);
        }
      }

      if (searchTerm.length > 0) {
        params.push(`search=${searchTerm}`);
      }

      if (params.length > 0) {
        url += `&${params.join("&")}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();
      const newData = append ? [...restaurants, ...data] : data;

      setRestaurants(newData);
      setFilteredRestaurants(newData);

      if (!append) setCurrentPage(1); // Só reseta na primeira chamada

      FetchFavorites();
    } catch (err) {
      console.error("Falha ao pesquisar restaurantes", err);
      setRestaurants([]);
      setFilteredRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const FetchCategories = async () => {
    try {
      const results: Category[] = await getCategories();
      setCategories(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
      setCategories([]);
    }
  };

  const AddFavorite = async (restaurantId: number) => {
    if (!user?.id || !restaurantId) return;
    try {
      await postLocalFavorite(restaurantId, user.id);
      FetchFavorites();
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
      setCategories([]);
    }
  };

  const RemoveFavorite = async (restaurantId: number) => {
    if (!user?.id || !restaurantId) return;
    try {
      await deleteLocalFavorite(restaurantId, user.id);
      FetchFavorites();
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
      setRestaurantsFavorites([]);
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

  React.useEffect(() => {
    FetchCategories();
  }, []);

  React.useEffect(() => {
    FetchRestaurants(1, itemsPerPage); // inicial, sem append
  }, [searchTerm, selectedCategories, selectedRatings, categories]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    FetchRestaurants(nextPage, itemsPerPage, true); // append = true
  };

  const handleSearch = () => {};
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prevSelected) => {
      if (categoryName === "Todos") {
        return ["Todos"];
      } else {
        const isAlreadySelected = prevSelected.includes(categoryName);
        if (isAlreadySelected) {
          return prevSelected.filter(
            (cat) => cat !== categoryName && cat !== "Todos"
          );
        } else {
          return prevSelected
            .filter((cat) => cat !== "Todos")
            .concat(categoryName);
        }
      }
    });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prevRatings) => {
      const isAlreadySelected = prevRatings.includes(rating);
      if (isAlreadySelected) {
        return prevRatings.filter((r) => r !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };

  const getNoRestaurantsMessage = () => {
    const filtersApplied =
      selectedCategories.length > 1 ||
      (selectedCategories.length === 1 && selectedCategories[0] !== "Todos") ||
      selectedRatings.length > 0;
    if (filtersApplied && filteredRestaurants.length === 0) {
      let message = "Nenhum restaurante encontrado";
      if (
        selectedCategories.length > 1 ||
        (selectedCategories.length === 1 && selectedCategories[0] !== "Todos")
      ) {
        const selectedCategoriesString = selectedCategories
          .filter((cat) => cat !== "Todos")
          .join(", ");
        message += ` na(s) categoria(s) ${selectedCategoriesString}`;
      }
      if (selectedRatings.length > 0) {
        const selectedRatingsString = selectedRatings.join(", ");
        message += `${
          selectedCategories.length > 1 ||
          (selectedCategories.length === 1 && selectedCategories[0] !== "Todos")
            ? " e com"
            : " com"
        } média${
          selectedRatings.length > 1 ? "s" : ""
        } de ${selectedRatingsString} estrel${
          selectedRatings.length > 1 ? "as" : "a"
        }`;
      }
      message += ".";
      return <div className="no-ratings-message">{message}</div>;
    }
    return null;
  };

  const noRestaurantsMessage = getNoRestaurantsMessage();

  return (
    <div className="local-page-container">
      <div className="local-page-content-wrapper">
        <SectionMenu />
        <div
          className="local-page-background"
          style={{ backgroundImage: "url('/img/localidade.jpg')" }}
        ></div>
        <div className="local-page-main-container">
          <div className="local-page-content-card background">
            <div className="local-explore-header">
              <h2 className="local-explore-title">Explorar Locais</h2>
              <Link
                href="/local-cadastro"
                className="local-restaurant-button bg-primary"
              >
                Cadastrar Local
              </Link>
            </div>
            <div className="local-search-container">
              <input
                type="text"
                placeholder="Buscar restaurantes"
                className="local-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {/* <button
                className="local-search-button bg-primary"
                onClick={handleSearch}
              >
                <Search /> Pesquisar
              </button> */}
            </div>
            <SectionFilterCategory
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedRatings={selectedRatings}
              onRatingChange={handleRatingChange}
            />

            <div className="local-loading-container">
              {loading && (
                <OrbitProgress
                  style={{
                    fontSize: 5,
                    display: "flex",
                    justifyItems: "center",
                  }}
                  color="#000000"
                  dense
                  speedPlus={2}
                />
              )}
            </div>

            {noRestaurantsMessage}

            {!noRestaurantsMessage && (
              <div className="local-restaurants-grid">
                {filteredRestaurants.map((place, index) => (
                  <div key={index} className="local-restaurant-card">
                    <Link
                      href={`/local-info/${place.id}`}
                      className="local-restaurant-image-link"
                    >
                      <img
                        src={place.url_img ?? undefined}
                        alt={place.name}
                        className="local-restaurant-image"
                      />
                    </Link>

                    <div className="local-restaurant-details">
                      <div>
                        <div className="space-between">
                          <b className="local-restaurant-name">
                            <Link
                              href={`/local-info/${place.id}`}
                              className="local-restaurant-name-link"
                            >
                              {place.name}
                            </Link>
                          </b>
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
                        {place.category &&
                          typeof place.category === "object" &&
                          place.category.name && (
                            <p className="local-restaurant-category">
                              {place.category.name}
                            </p>
                          )}
                        {place.averageRating !== undefined && (
                          <div className="local-restaurant-rating">
                            {Array(Math.round(place.averageRating))
                              .fill(0)
                              .map((_, starIndex) => (
                                <img
                                  key={`filled-${place.id}-${starIndex}`}
                                  className="local-restaurant-star"
                                  src="img/estrela-preenchida.png"
                                  alt="Estrela"
                                />
                              ))}
                          </div>
                        )}
                        <p className="local-restaurant-description">
                          {place.aboutUs}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!noRestaurantsMessage &&
              visibleRestaurants.length < filteredRestaurants.length && (
                <div className="local-load-more-container">
                  <button
                    className="local-load-more-button bg-primary"
                    onClick={handleLoadMore}
                  >
                    Mais
                  </button>
                </div>
              )}
          </div>
        </div>
        <SectionFooter />
      </div>
    </div>
  );
};

export default LocalPage;
