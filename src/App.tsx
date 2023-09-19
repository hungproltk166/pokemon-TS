import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './Component/PokemonCollection';
import { Pokemon } from './interface';


interface Pokemons {
  name: string;
  url: string;
}

export interface Detaill {
  id: number
  isOpened: boolean
}



const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setDetail] = useState<Detaill>({
    id: 0,
    isOpened: false,
  })
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
      setNextUrl(res.data.next)
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons((p) => [...p, poke.data])
        console.log(poke.data)
        setLoading(false)
      })
    }
    getPokemon();
  }, [])


  const handleNextUrl = async () => {
    setLoading(true)
    const res = await axios.get(nextUrl)
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
    })

  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">
          POKEMON
        </header>
        <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail} />
        {!viewDetail.isOpened && (
          <div className='btn' >
            <button onClick={handleNextUrl}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
