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
import { OrbitProgress } from "react-loading-indicators";

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
  const [selectedRatings, setSelectedRatings] = React.useState<number[]>([]);

  console.log("LocalPage rendered. selectedCategories:", selectedCategories, "selectedRatings:", selectedRatings);

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
      const results: Category[] = await getCategories();
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

    if (!selectedCategories.includes("Todos")) {
      selectedCategories.forEach(selectedCategoryName => {
        const category = categories.find(cat => cat.name?.toLowerCase() === selectedCategoryName.toLowerCase());
        if (category?.id) {
          params.push(`categoryId=${category.id}`);
        }
      });
    }

    if (selectedRatings.length > 0) {
      const ratingsParam = selectedRatings.map(rating => `ratings=${rating}`).join('&');
      if (ratingsParam) {
        params.push(ratingsParam);
      }
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
    if (selectedCategories.includes("Todos") && selectedCategories.length > 1) {
      setSelectedCategories(prev => prev.filter(cat => cat !== "Todos"));
    } else if (selectedCategories.length === 0 && selectedRatings.length === 0) {
      setSelectedCategories(["Todos"]);
    }
  }, [searchTerm, selectedCategories, selectedRatings, categories]);

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
    const filtersApplied = selectedCategories.length > 1 || (selectedCategories.length === 1 && selectedCategories[0] !== "Todos") || selectedRatings.length > 0;
    if (filtersApplied && filteredRestaurants.length === 0) {
      let message = "Nenhum restaurante encontrado";
      if (selectedCategories.length > 1 || (selectedCategories.length === 1 && selectedCategories[0] !== "Todos")) {
        const selectedCategoriesString = selectedCategories.filter(cat => cat !== "Todos").join(', ');
        message += ` na(s) categoria(s) ${selectedCategoriesString}`;
      }
      if (selectedRatings.length > 0) {
        const selectedRatingsString = selectedRatings.join(', ');
        message += `${selectedCategories.length > 1 || (selectedCategories.length === 1 && selectedCategories[0] !== "Todos") ? ' e com' : ' com'} média${selectedRatings.length > 1 ? 's' : ''} de ${selectedRatingsString} estrel${selectedRatings.length > 1 ? 'as' : 'a'}`;
      }
      message += ".";
      return <div className="no-ratings-message">{message}</div>;
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
          <div className="local-page-background" style={{ backgroundImage: "url('/img/localidade.jpg')" }}></div>
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
                selectedRatings={selectedRatings}
                onRatingChange={handleRatingChange}
              />

              <div className="local-loading-container">
                {loading &&  <OrbitProgress
                    style={{
                      fontSize: 5,
                      display: "flex",
                      justifyItems: "center",
                    }}
                    color="#000000"
                    dense
                    speedPlus={2}
                  />}
              </div>

              {noRestaurantsMessage}

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