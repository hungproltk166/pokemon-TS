import React, { useEffect } from 'react'
import "./pokemon.css"
import { Detaill } from '../App';
import { useState } from 'react';
interface Props {
    viewDetail: Detaill;
    setDetail: React.Dispatch<React.SetStateAction<Detaill>>
    abilities: {
        name: string;
        ability: string;
    }[] | undefined;
    name: string;
    id: number;
    image: string;
}
const PokemonList: React.FC<Props> = (props) => {
    const [isSelected, setSelected] = useState(false)
    const { name, id, image, abilities, viewDetail, setDetail } = props;


    useEffect(() => {
        setSelected(id === viewDetail?.id)
    }, [viewDetail])
    const closeDetail = () => {
        setDetail({
            id: 0,
            isOpened: false
        });
    }
    return (
        <div className=''>
            {isSelected ? (
                <section className=' pokemon-list-detailed'>
                    <div className="detail-container">
                        <p className="detail-close" onClick={closeDetail}>
                            X
                        </p>
                        <div className="detail-info">
                            <img src={image} alt="pokemon" className='detail-img' />
                            <p className="detail-name">{name}</p>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability">Ability:</p>
                            {abilities?.map((ab: any) => {
                                return <div className=''>{ab.ability.name}</div>
                            })}
                        </div>
                    </div>
                </section>
            ) : (<section className="pokemon-list-container">
                <p className='pokemon-name'>{name} </p>
                <img src={image} alt='pokemon-image' />
            </section>)}
        </div>
    )
}

export default PokemonList
