import React, { useEffect } from 'react';
import { useState } from 'react';
import UserControl from '../components/Controls/UserControl';
import { fetchPokemon } from '../services/pokemon';
import PokeList from '../components/PokemonList/PokeList';

export default function Pokemon() {
  const [poke, setPoke] = useState([]);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemon(query);
      setPoke(data);
      setLoading(false);
    };
    fetchData();
  }, [query]);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      <UserControl setLoading={setLoading} query={query} setQuery={setQuery} />
      <PokeList poke={poke} />
    </div>
  );
}