import React, { useEffect, useState } from 'react';
import Header from "@/components/Header"
import { useRouter } from 'next/router';
import { getMusics } from '../../utils/fetchAPI';

export default function Album() {
  const router = useRouter();

  const getMusicsApi = async () => {
    const { id } = router.query as { id: string };
    const musics = await getMusics(id);
    console.log('musicsssssss', musics);
  }

  useEffect(() => {
    getMusicsApi();
  }, []);
  
  return (
  <div className="flex flex-col">
    <Header />
    <main>
      <h1>page do album do artista</h1>
    </main>
  </div>
  );
};
