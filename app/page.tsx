"use client"

import { useEffect, useState } from 'react';

interface Anime {
  id: number;
  name: string;
  genre: string;
  rating: number | null;
}

export default function Home() {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    fetch('https://localhost:7290/animes')
      .then(response => response.json())
      .then(data => setAnimes(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Lista de Animes</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Gênero</th>
            <th className="px-4 py-2">Classificação</th>
          </tr>
        </thead>
        <tbody>
          {animes.map(anime => (
            <tr key={anime.id}>
              <td className="border px-4 py-2">{anime.id}</td>
              <td className="border px-4 py-2">{anime.name}</td>
              <td className="border px-4 py-2">{anime.genre}</td>
              <td className="border px-4 py-2">{anime.rating || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
