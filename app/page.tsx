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
  const [showModal, setShowModal] = useState(false);
  const [newAnime, setNewAnime] = useState<Partial<Anime>>({});

  useEffect(() => {
    fetch('https://localhost:7290/animes')
      .then(response => response.json())
      .then(data => setAnimes(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddAnime = () => {
    fetch('https://localhost:7290/animes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnime),
    })
      .then(response => response.json())
      .then(data => {
        setAnimes([...animes, data]);
        setShowModal(false);
        setNewAnime({});
      })
      .catch(error => console.error('Error adding anime:', error));
  };

  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Lista de Animes</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(true)}
      >
        Adicionar Anime
      </button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Adicionar Anime</h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                        <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nome do Anime" onChange={e => setNewAnime({...newAnime, name: e.target.value})} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Gênero:</label>
                        <input type="text" id="genre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Gênero do Anime" onChange={e => setNewAnime({...newAnime, genre: e.target.value})} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Classificação:</label>
                        <input type="number" id="rating" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Classificação do Anime" onChange={e => setNewAnime({...newAnime, rating: parseInt(e.target.value, 10)})} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddAnime}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
