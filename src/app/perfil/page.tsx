"use client";
    import React from 'react';
    import ProfilePage from '@/components/ProfilePage';
    import { useAuth } from '@/context/AuthContext';
    import { useRouter } from 'next/navigation';
    import { useEffect } from 'react';

    const MyProfilePage = () => {
      const { user, token } = useAuth();
      const router = useRouter();

      useEffect(() => {
        if (!user?.id && !token) {
          router.push('/login');
        }
      }, [user, token, router]);

      if (!user || !token) {
        return <div>Redirecionando...</div>;
      }

      return <ProfilePage userId={user.id.toString()} />; 
    };

    export default MyProfilePage;