"use client";
import React from 'react';
import ProfilePage from '@/components/ProfilePage';
import { useParams } from 'next/navigation';

const OtherUserProfilePage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>ID de usuário inválido.</div>;
  }

  return <ProfilePage userId={id as string} />;
};

export default OtherUserProfilePage;