export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    }
}
export interface pokemonDetail extends Pokemon {
    abilities?: {
        ability: string;
        name: string;
    }[];
}
