"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import MenuSection from './MenuSection';
import FooterSection from './FooterSection';
import { apiBaseUrl } from './LocalInfoPage';
import { Restaurant } from '../interfaces/restaurant';
import { Loader2 } from 'lucide-react'; // Import the Loader component

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
            setErrorRatings(null); // Clear any previous error message
            setLoadingRatings(false);
            return;
          }
          const errorText = await response.text(); // Get the error as text
          console.error("Failed to fetch user ratings:", errorText);
          setErrorRatings(`Failed to load your ratings: ${response.status} - ${errorText}`); // Include status and raw error
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
    <div className="relative w-full h-full">
      <div className="bg-cover bg-center h-[350px] w-full">
        <div className="bg-gradient-to-r from-[#37ADE4] to-[#1F607E]">
          <MenuSection />
        </div>

        <div className="ml-[70px] mr-[70px]">
          <div className="flex gap-[5%] items-center mt-[30px] mb-[30px]">
            <img
              className="rounded-full w-[130px] h-[130px] object-cover"
              src={user?.profilePicture ?? "/img/user-null.png"}
              alt="Foto de Perfil"
            />
            <div className="flex flex-col">
              <div className="flex flex-col">
                {user && token ? (
                  <h1 className="mb-[4px] mt-[4px]">{user.exibitionName}</h1>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center">
                <img
                  className="w-[25px] h-[25px] mr-[5px]"
                  src="img/estrela.png"
                  alt="Estrela"
                />
                <h4 className="text-[#9D9393] my-0">{ratingsText}</h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[20%_68%_10%] gap-[1%] items-center">
            <h2 className="font-bold">Minhas Avaliações</h2>
            <div className="flex items-center gap-2">
              <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                5 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
              </button>
              <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                4 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
              </button>
              <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                3 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
              </button>
              <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                2 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
              </button>
              <button className="bg-[#31afe1] text-white rounded-lg flex items-center px-4">
                1 <img className="w-[15px] h-[15px]" src="img/estrela-preenchida.png" alt="Estrela" />
              </button>
            </div>
            <button className="bg-[#55798E] text-white rounded-md">Editar Perfil</button>
          </div>

          {loadingRatings ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-black" />
              <p className="text-[#9D9393] mt-2">Carregando suas avaliações...</p>
            </div>
          ) : userRatings.length > 0 ? (
            userRatings.map((rating) => (
              <div key={rating.id} className="border-2 border-[#666565] rounded-lg p-[30px] mt-[15px]">
                <div>
                  <div className="flex">
                    <img
                      className="w-[100px] h-[100px] object-cover rounded"
                      src={rating.restaurant.url_img || "img/img-placeholder.jpg"}
                      alt={rating.restaurant.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "img/img-placeholder.jpg";
                      }}
                    />
                    <div className="flex flex-col ml-[10px] gap-[3%]">
                      <h3 className="mt-0 mb-[3px] font-bold">{rating.restaurant.name}</h3>
                      <div className="flex items-center">
                        {Array(rating.value)
                          .fill(0)
                          .map((_, index) => (
                            <img
                              key={index}
                              className="w-[25px] h-[25px] mr-[5px]"
                              src="img/estrela-preenchida.png"
                              alt="Estrela"
                            />
                          ))}
                      </div>
                      <h5 className="text-[#9D9393] mt-2">{new Date(rating.createdAt).toLocaleDateString()}</h5>
                    </div>
                  </div>
                  <h4 className="mb-0">{rating.comments}</h4>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center font-bold text-[#9D9393]">
              Nenhuma avaliação feita ainda.
            </div>
          )}
        </div>
        <div className='mt-[30px]'></div>
        <FooterSection />
      </div>
    </div>
  );
};

export default ProfilePage;

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