import React from 'react'
import { Pokemon, pokemonDetail } from '../interface';
import PokemonList from './PokemonList';
import "./pokemon.css"
import { Detaill } from '../App';


interface Props {
    pokemons: pokemonDetail[];
    viewDetail: Detaill;
    setDetail: React.Dispatch<React.SetStateAction<Detaill>>
}
const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setDetail } = props
    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpened) {
            setDetail({
                id: id,
                isOpened: true
            })
        }
    }
    return (
        <>
            <section className={viewDetail.isOpened ? "collection-container-active" : "collection-container"}>
                {viewDetail.isOpened ? (
                    <div className='overlay'></div>
                ) : (
                    <div className=''></div>
                )}
                {pokemons.map((pokemon) => {
                    return (
                        <div onClick={() => selectPokemon(pokemon.id)}>
                            <PokemonList
                                viewDetail={viewDetail}
                                setDetail={setDetail}
                                key={pokemon.id}
                                name={pokemon.name}
                                id={pokemon.id}
                                image={pokemon.sprites.front_default}
                                abilities={pokemon.abilities}
                            />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default PokemonCollection
