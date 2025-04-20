"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import SectionMenu from './SectionMenu';
import SectionFooter from './SectionFooter';
import { apiBaseUrl } from './LocalInfoPage';
import { Restaurant } from '../interfaces/restaurant';
import { Loader2 } from 'lucide-react';
import ModalEditProfile from './ModalEditProfile';
import './css/ProfilePage.css';

interface Rating {
  id: string;
  value: number;
  restaurantId: string;
  userId: string;
  comments: string | null;
  createdAt: string;
  restaurant: Restaurant;
  user: { userName: string };
}

const ProfilePage = () => {
  const { user, token } = useAuth();
  const [userRatings, setUserRatings] = useState<Rating[]>([]);
  const [loadingRatings, setLoadingRatings] = useState<boolean>(true);
  const [errorRatings, setErrorRatings] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = async (data: {
    exibitionName: string;
    userName: string;
    profilePictureFile: File | null;
  }) => {
    console.log("Dados a serem salvos no ProfilePage:", data);
    try {
      const formData = new FormData();
      formData.append('exibitionName', data.exibitionName);
      formData.append('userName', data.userName);
      if (data.profilePictureFile) {
        formData.append('profilePicture', data.profilePictureFile);
      }

      const response = await fetch(`${apiBaseUrl}/user/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Perfil atualizado com sucesso!");
      } else {
        const errorText = await response.text();
        console.error("Erro ao atualizar o perfil:", errorText);
        alert(`Erro ao atualizar o perfil: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados de perfil:", error);
      alert("Ocorreu um erro ao tentar salvar suas alterações.");
    } finally {
      handleCloseEditModal();
    }
  };

  useEffect(() => {
    const fetchUserRatings = async () => {
      if (!user?.id || !token) {
        setLoadingRatings(false);
        return;
      }

      setLoadingRatings(true);
      setErrorRatings(null);

      try {
        const response = await fetch(`${apiBaseUrl}/rating/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setUserRatings([]);
            setErrorRatings(null);
            setLoadingRatings(false);
            return;
          }
          const errorText = await response.text();
          console.error("Failed to fetch user ratings:", errorText);
          setErrorRatings(`Failed to load your ratings: ${response.status} - ${errorText}`);
          setUserRatings([]);
          return;
        }

        const data: Rating[] = await response.json();
        setUserRatings(data);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
        setErrorRatings("An unexpected error occurred while loading your ratings.");
        setUserRatings([]);
      } finally {
        setLoadingRatings(false);
      }
    };

    fetchUserRatings();
  }, [user?.id, token]);

  if (errorRatings) {
    return <div>{errorRatings}</div>;
  }

  const ratingsText = userRatings.length === 1 ? '1 avaliação' : `${userRatings.length} avaliações`;

  return (
    <div className="profile-page-container">
      <div className="profile-page-header-bg">
        <div className="profile-page-header-gradient">
          <SectionMenu />
        </div>

        <div className="profile-page-content">
          <div className="profile-info-container">
            <img
              className="profile-picture"
              src={user?.profilePicture ?? "/img/user-null.png"}
              alt="Foto de Perfil"
            />
            <div className="profile-details">
              <div className="profile-name-container">
                {user && token ? (
                  <div className="profile-name-container">
                    <h1 className="profile-name">{user.exibitionName}</h1>
                    {user.userName && <h2 className="profile-username">@{user.userName}</h2>}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="ratings-info">
                <img
                  className="star-icon"
                  src="img/estrela.png"
                  alt="Estrela"
                />
                <h4 className="ratings-text">{ratingsText}</h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr_auto] gap-[1%] items-center">
            <h2 className="my-ratings-header">Minhas Avaliações</h2>
            <div className="rating-filter-buttons">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  className="rating-filter-button"
                >
                  {rating}
                  <img
                    className="filled-star-icon"
                    src="img/estrela-preenchida.png"
                    alt="Estrela"
                  />
                </button>
              ))}
            </div>
            <button
              className="edit-profile-button"
              onClick={handleOpenEditModal}
            >
              Editar Perfil
            </button>
          </div>

          {loadingRatings ? (
            <div className="loading-ratings-container">
              <Loader2 className="loading-spinner" />
              <p className="loading-text">Carregando suas avaliações...</p>
            </div>
          ) : userRatings.length > 0 ? (
            userRatings.map((rating) => (
              <div key={rating.id} className="rating-card">
                <div>
                  <div className="rating-header">
                    <img
                      className="restaurant-image"
                      src={rating.restaurant.url_img || "img/img-placeholder.jpg"}
                      alt={rating.restaurant.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "img/img-placeholder.jpg";
                      }}
                    />
                    <div className="restaurant-info">
                      <h3 className="restaurant-name">{rating.restaurant.name}</h3>
                      <div className="rating-stars">
                        {Array(rating.value)
                          .fill(0)
                          .map((_, index) => (
                            <img
                              key={index}
                              className="star-icon"
                              src="img/estrela-preenchida.png"
                              alt="Estrela"
                            />
                          ))}
                      </div>
                      <h5 className="rating-date">{new Date(rating.createdAt).toLocaleDateString()}</h5>
                    </div>
                  </div>
                  <h4 className="rating-comment">{rating.comments}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="no-ratings-message">
              Nenhuma avaliação feita ainda.
            </div>
          )}
        </div>
        <div className="profile-page-footer-spacing"></div>
        <SectionFooter />
      </div>

      <ModalEditProfile
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;