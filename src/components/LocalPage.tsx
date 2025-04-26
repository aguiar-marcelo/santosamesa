"use client";
import React from "react";
import { Search } from "lucide-react";
import { getCategories } from "@/services/routes";
import LocalInfoPage from "./LocalInfoPage";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import SectionFooter from "./SectionFooter";
import SectionMenu from "./SectionMenu";
import SectionFilterCategory from "@/components/SectionFilterCategory";
import './css/LocalPage.css'

const LocalPage = () => {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const [restaurantSelected, setRestaurantSelected] = React.useState<Restaurant | undefined>(undefined);
  const [visibleRestaurants, setVisibleRestaurants] = React.useState<Restaurant[]>([]);
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRestaurants, setFilteredRestaurants] = React.useState<Restaurant[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(["Todos"]);
  const [selectedRatingRanges, setSelectedRatingRanges] = React.useState<{ min: number; max: number }[]>([]);

  console.log("LocalPage rendered. selectedCategories:", selectedCategories, "selectedRatingRanges:", selectedRatingRanges);

  const getRatingRange = (rating: number) => {
    if (rating === 1) return { minRating: 0.1, maxRating: 1.4 };
    if (rating === 2) return { minRating: 1.5, maxRating: 2.4 };
    if (rating === 3) return { minRating: 2.5, maxRating: 3.4 };
    if (rating === 4) return { minRating: 3.5, maxRating: 4.4 };
    if (rating === 5) return { minRating: 4.5, maxRating: 5 };
    return { minRating: undefined, maxRating: undefined };
  };

  const FetchRestaurants = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurants(data);
      setFilteredRestaurants(data);
      setCurrentPage(1);
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
      const results = await getCategories();
      setCategories(results);
    } catch (err) {
      console.error("Falha ao buscar categorias", err);
      setCategories([]);
    }
  };

  React.useEffect(() => {
    FetchCategories();
  }, []);

  React.useEffect(() => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/restaurant?`;
    const params: string[] = [];

    const categoryIdsToFilter: number[] = [];
    if (!selectedCategories.includes("Todos")) {
      selectedCategories.forEach(selectedCategoryName => {
        const category = categories.find(cat => cat.name?.toLowerCase() === selectedCategoryName.toLowerCase());
        if (category?.id) {
          params.push(`categoryId=${category.id}`);
        }
      });
    }

    if (selectedRatingRanges.length > 0) {
      selectedRatingRanges.forEach(range => {
        if (range.min !== undefined && range.max !== undefined) {
          params.push(`minRating=${range.min}`);
          params.push(`maxRating=${range.max}`);
        }
      });
    }

    const finalUrl = url + params.join('&');
    FetchRestaurants(finalUrl);

    let filtered = restaurants;
    if (searchTerm) {
      filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredRestaurants(filtered);
    setCurrentPage(1);

    if (selectedCategories.includes("Todos") && (selectedCategories.length > 1 || selectedRatingRanges.length > 0)) {
      setSelectedCategories(prev => prev.filter(cat => cat !== "Todos"));
    } else if (selectedCategories.length === 0 && selectedRatingRanges.length === 0) {
      setSelectedCategories(["Todos"]);
    }
  }, [searchTerm, selectedCategories, selectedRatingRanges, categories]);

  React.useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    setVisibleRestaurants(
      filteredRestaurants.slice(
        startIndex,
        endIndex
      )
    );
  }, [filteredRestaurants, currentPage, itemsPerPage]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => { };
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") { }
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prevSelected) => {
      if (categoryName === "Todos") {
        return ["Todos"];
      } else {
        const isAlreadySelected = prevSelected.includes(categoryName);
        if (isAlreadySelected) {
          return prevSelected.filter((cat) => cat !== categoryName && cat !== "Todos");
        } else {
          return prevSelected.filter(cat => cat !== "Todos").concat(categoryName);
        }
      }
    });
    setSelectedRatingRanges([]);
  };

  const handleRatingChange = (rating: number) => {
    const { minRating, maxRating } = getRatingRange(rating);
    if (minRating === undefined || maxRating === undefined) return;

    const newRange = { min: minRating, max: maxRating };

    setSelectedRatingRanges((prevRanges) => {
      const isAlreadySelected = prevRanges.some(
        (range) => range.min === newRange.min && range.max === newRange.max
      );

      if (isAlreadySelected) {
        return prevRanges.filter(
          (range) => !(range.min === newRange.min && range.max === newRange.max)
        );
      } else {
        return [...prevRanges, newRange];
      }
    });
    setSelectedCategories([]);
  };

  const getNoRestaurantsMessage = () => {
    if (selectedRatingRanges.length > 0 && filteredRestaurants.length === 0) {
      const selectedRatings = selectedRatingRanges.map(range => {
        if (range.min === 0.1 && range.max === 1.4) return 1;
        if (range.min === 1.5 && range.max === 2.4) return 2;
        if (range.min === 2.5 && range.max === 3.4) return 3;
        if (range.min === 3.5 && range.max === 4.4) return 4;
        if (range.min === 4.5 && range.max === 5) return 5;
        return null;
      }).filter(rating => rating !== null);

      if (selectedRatings.length === 1) {
        return `Nenhum restaurante com o rating ${selectedRatings[0]}.`;
      } else if (selectedRatings.length > 1) {
        const ratingsString = selectedRatings.join(', ');
        return `Nenhum restaurante com os ratings ${ratingsString}.`;
      }
    }
    return null;
  };

  const noRestaurantsMessage = getNoRestaurantsMessage();

  return (
    <div className="local-page-container">
      {restaurantSelected ? (
        <LocalInfoPage data={restaurantSelected} setData={setRestaurantSelected} />
      ) : (

        <div className="local-page-content-wrapper">
          <SectionMenu />
          <div className="local-page-background" style={{ backgroundImage: "url('img/localidade.jpg')" }}></div>
          <div className="local-page-main-container">
            <div className="local-page-content-card background">
              <div className="local-explore-header">
                <h2 className="local-explore-title">Explorar Locais</h2>
                <Link href="/local-cadastro" className="local-restaurant-button bg-primary">Cadastrar Local</Link>
              </div>
              <div className="local-search-container">
                <input type="text" placeholder="Buscar restaurantes" className="local-search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
                <button className="local-search-button bg-primary" onClick={handleSearch}>
                  <Search /> Pesquisar
                </button>
              </div>
              <SectionFilterCategory
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                selectedRatingRanges={selectedRatingRanges}
                onRatingChange={handleRatingChange}
              />

              <div className="local-loading-container">
                {loading && <Loader2 className="local-loading-spinner" />}
              </div>

              {noRestaurantsMessage && (
                <div className="local-no-restaurants-message">
                  {noRestaurantsMessage}
                </div>
              )}

              {!noRestaurantsMessage && (
                <div className="local-restaurants-grid">
                  {visibleRestaurants.map((place, index) => (
                      <div key={index} className="local-restaurant-card">
                        <img src={place.url_img ?? undefined} alt={place.name} className="local-restaurant-image" />
                        <div className="local-restaurant-details">
                          <div>
                            <b className="local-restaurant-name">{place.name}</b>
                            {place.category && typeof place.category === 'object' && place.category.name && (
                              <p className="local-restaurant-category">{place.category.name}</p>
                            )}
                            {place.averageRating !== undefined && (
                              <div className="local-restaurant-rating">
                                {Array(Math.round(place.averageRating)).fill(0).map((_, starIndex) => (
                                  <img key={`filled-${place.id}-${starIndex}`} className="local-restaurant-star" src="img/estrela-preenchida.png" alt="Estrela" />
                                ))}
                              </div>
                            )}
                            <p className="local-restaurant-description">{place.aboutUs}</p>
                          </div>
                          <button type="button" onClick={() => setRestaurantSelected(place)} className="local-restaurant-button bg-primary">Saiba mais</button>
                        </div>
                      </div>
                  ))}
                </div>
              )}

              {!noRestaurantsMessage && visibleRestaurants.length < filteredRestaurants.length && (
                <div className="local-load-more-container">
                  <button className="local-load-more-button bg-primary" onClick={handleLoadMore}>Mais</button>
                </div>
              )}
            </div>
          </div>
          <SectionFooter />
        </div>
      )}
    </div>
  );
};

export default LocalPage;