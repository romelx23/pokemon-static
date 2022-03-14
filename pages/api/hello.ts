// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { pokeApi } from "../../api";
import { PokemonListResponse } from '../../interfaces/pokemon-list';

type Data={
    name:string;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse<any>) {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=150&offset=200');
  const pokemons = data.results.map(pokemon => {
    pokemon.id = parseInt(pokemon.url.split('/')[6]);
    pokemon.imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    if(pokemon.id>649){
      pokemon.imagen=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    }
    return {
      ...pokemon,
    };
  });
  res.status(200).json(pokemons)
}
