"use client";
 import React, { useState, useEffect, useCallback } from 'react';
 import { useAuth } from '@/context/AuthContext';
 import SectionMenu from '@/components/SectionMenu';
 import SectionFooter from '@/components/SectionFooter';
 import { apiBaseUrl } from "@/services/api";
 import { Loader2 } from 'lucide-react';
 import ModalEditProfile from '@/components/ModalEditProfile';
 import ModalDeleteProfile from '@/components/ModalDeleteProfile';
 import '@/components/css/ProfilePage.css';
 import SectionFilterRatingUser from '@/components/SectionFilterRatingUser';

 const ProfilePage: React.FC<ProfilePageProps> = ({ userId }) => {
     const { user: loggedInUser, token, signOut, updateUser } = useAuth();
     const [profileUser, setProfileUser] = useState<User | null>(null);
     const [userRatings, setUserRatings] = useState<Rating[]>([]);
     const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
     const [errorProfile, setErrorProfile] = useState<string | null>(null);
     const [loadingRatings, setLoadingRatings] = useState<boolean>(true);
     const [errorRatings, setErrorRatings] = useState<string | null>(null);
     const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
     const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
     const [selectedRatingId, setSelectedRatingId] = useState<string | null>(null);

     const handleOpenEditModal = () => {
         setIsEditModalOpen(true);
     };

     const handleCloseEditModal = () => {
         setIsEditModalOpen(false);
     };

     const handleOpenDeleteModalFromEdit = () => {
         setIsEditModalOpen(false);
         setIsDeleteModalOpen(true);
     };

     const handleCloseDeleteModal = () => {
         setIsDeleteModalOpen(false);
         setIsEditModalOpen(true);
     };

     const fetchProfileData = useCallback(async () => {
         setLoadingProfile(true);
         setErrorProfile(null);

         try {
             const response = await fetch(`${apiBaseUrl}/auth/${userId}`, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                 },
             });

             if (!response.ok) {
                 if (response.status === 404) {
                     setErrorProfile('Perfil não encontrado.');
                 } else {
                     setErrorProfile('Erro ao carregar o perfil.');
                 }
                 return;
             }

             const data: User = await response.json();
             setProfileUser(data);
         } catch (error) {
             setErrorProfile('Erro ao conectar ao servidor.');
         } finally {
             setLoadingProfile(false);
         }
     }, [userId, token]);

     const fetchUserRatings = useCallback(async (ratingsToFilter?: number[]) => {
         if (!userId || !token) {
             setLoadingRatings(false);
             return;
         }

         setLoadingRatings(true);
         setErrorRatings(null);

         let url = `${apiBaseUrl}/rating/user/${userId}`;
         if (ratingsToFilter && ratingsToFilter.length > 0) {
             ratingsToFilter.forEach((rating) => {
                 url += `&ratings=${rating}`;
             });
             url = url.replace('&', '?');
         }

         try {
             const response = await fetch(url, {
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
                 if (response.status === 500) {
                     setErrorRatings("Ocorreu um erro interno no servidor ao carregar as avaliações. Por favor, tente novamente mais tarde.");
                     setUserRatings([]);
                     setLoadingRatings(false);
                 } else {
                     const errorText = await response.text();
                     setErrorRatings(`Falha ao carregar as avaliações: ${response.status} - ${errorText}`);
                     setUserRatings([]);
                     setLoadingRatings(false);
                 }
                 return;
             }

             const data: Rating[] = await response.json();
             setUserRatings(data);
         } catch (error) {
             setErrorRatings("Um erro inesperado ocorreu ao carregar suas avaliações.");
             setUserRatings([]);
         } finally {
             setLoadingRatings(false);
         }
     }, [userId, token]);

     const handleProfileUpdateSuccess = useCallback((updatedUserData: User) => {
         handleCloseEditModal();
         updateUser(updatedUserData);
         fetchUserRatings(selectedRatings);
         fetchProfileData();
     }, [fetchUserRatings, selectedRatings, handleCloseEditModal, updateUser, fetchProfileData]);

     const handleDeleteAccountSuccess = useCallback(() => {
         setIsDeleteModalOpen(false);
         signOut();
     }, [signOut]);

     useEffect(() => {
         fetchProfileData();
     }, [fetchProfileData]);

     useEffect(() => {
         fetchUserRatings(selectedRatings);
     }, [fetchUserRatings, selectedRatings, userId]);

     const handleFilterByRating = (rating: number) => {
         setSelectedRatings((prevRatings) => {
             const alreadySelected = prevRatings.includes(rating);
             if (alreadySelected) {
                 return prevRatings.filter(r => r !== rating);
             } else {
                 return [...prevRatings, rating];
             }
         });
     };

     const handleRatingClick = (ratingId: string) => {
         setSelectedRatingId(ratingId === selectedRatingId ? null : ratingId);
     };

     const ratingsText = userRatings.length === 1 ? '1 avaliação' : `${userRatings.length} avaliações`;
     const isOwnProfile = loggedInUser?.id?.toString() === userId;

     if (loadingProfile) {
         return (
             <div className="profile-page-container">
                 <div className="loading-profile-container">
                     <p className="no-ratings-message" style={{ marginTop: "150px"}}>Carregando perfil...</p>
                 </div>
             </div>
         );
     }

     if (errorProfile) {
         return (
             <div className="profile-page-container">
                 <div className="error-profile-container">
                     <p className="error-text">{errorProfile}</p>
                 </div>
             </div>
         );
     }

     if (!profileUser) {
         return (
             <div className="profile-page-container">
                 <div className="no-profile-container">
                     <p>Perfil não encontrado.</p>
                 </div>
             </div>
         );
     }

     return (
         <div className="profile-page-container">
             <div className="background">
                 <div className="profile-page-header-gradient">
                     <SectionMenu />
                 </div>

                 <div className="profile-page-content">
                     <div className="profile-info-container">
                         <img
                             className="profile-picture"
                             src={profileUser.profilePicture ?? "/img/user-null.png"}
                             alt="Foto de Perfil"
                             onError={(e) => {
                                 (e.target as HTMLImageElement).src = "/img/user-null.png";
                             }}
                         />
                         <div className="profile-details">
                             <div className="profile-name-container">
                                 <h1 className="profile-name">{profileUser.exibitionName}</h1>
                                 {profileUser.userName && <h2 className="profile-username">@{profileUser.userName}</h2>}
                             </div>
                             <div className="ratings-info">
                                 <img
                                     className="star-icon"
                                     src="/img/estrela.png"
                                     alt="Estrela"
                                 />
                                 <h4 className="ratings-text">{ratingsText}</h4>
                             </div>
                         </div>
                     </div>

                     <div className="grid grid-cols-[auto_1fr_auto] gap-[1%] items-center">
                         <h2 className="my-ratings-header">Avaliações de {isOwnProfile ? 'Mim' : profileUser.exibitionName || profileUser.userName}</h2>
                         <SectionFilterRatingUser
                             selectedRatings={selectedRatings}
                             onRatingClick={handleFilterByRating}
                         />
                         {isOwnProfile && (
                             <button className="edit-profile-button" onClick={handleOpenEditModal}>
                                 Editar Perfil
                             </button>
                         )}
                     </div>

                     {loadingRatings ? (
                         <div className="loading-ratings-container">
                             <Loader2 className="loading-spinner" />
                             <p className="no-ratings-message">Carregando avaliações...</p>
                         </div>
                     ) : userRatings.length > 0 ? (
                         userRatings.map((rating) => (
                             <div
                                 key={rating.id}
                                 className={`bg-white rating-card ${selectedRatingId === rating.id ? 'selected-rating' : ''}`}
                                 onClick={() => handleRatingClick(rating.id)}
                             >
                                 <div>
                                     <div className="rating-header">
                                         <img
                                             className="restaurant-image"
                                             src={rating.restaurant.url_img || "/img/img-placeholder.jpg"}
                                             alt={rating.restaurant.name}
                                             onError={(e) => {
                                                 (e.target as HTMLImageElement).src = "/img/img-placeholder.jpg";
                                             }}
                                         />
                                         <div className="restaurant-info">
                                             <h3 className="restaurant-name">{rating.restaurant.name}</h3>
                                             <div className="ratings-info">
                                                 {Array(rating.value)
                                                     .fill(0)
                                                     .map((_, index) => (
                                                         <img
                                                             key={index}
                                                             className="star-icon"
                                                             src="/img/estrela-preenchida.png"
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
                     ) : errorRatings ? (
                         <div className="no-ratings-message">
                             {errorRatings}
                         </div>
                     ) : (
                         <div className="no-ratings-message">
                             {selectedRatings.length > 0
                                 ? selectedRatings.length === 1
                                     ? `Sem avaliações de ${selectedRatings[0]} estrela${selectedRatings[0] === 1 ? '' : 's'}`
                                     : `Sem avaliações de ${selectedRatings.join(', ')} estrelas`
                                 : 'Nenhuma avaliação feita ainda.'}
                         </div>
                     )}
                 </div>
                 <div className="profile-page-footer-spacing"></div>
                 <SectionFooter />
             </div>

             {isOwnProfile && (
                 <>
                     <ModalEditProfile
                         isOpen={isEditModalOpen}
                         onClose={handleCloseEditModal}
                         user={loggedInUser}
                         onSaveSuccess={handleProfileUpdateSuccess}
                         onOpenDeleteModal={handleOpenDeleteModalFromEdit}
                     />

                     {isDeleteModalOpen && loggedInUser?.id !== undefined && (
                         <ModalDeleteProfile
                             isOpen={isDeleteModalOpen}
                             onClose={handleCloseDeleteModal}
                             userId={loggedInUser.id}
                             onDeleteSuccess={handleDeleteAccountSuccess}
                         />
                     )}
                 </>
             )}
         </div>
     );
 };

 export default ProfilePage;