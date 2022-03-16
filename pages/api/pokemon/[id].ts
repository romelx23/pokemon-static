// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { pokeApi } from "../../../api";
import { PokemonListResponse } from "../../../interfaces/pokemon-list";
import { Pokemon } from '../../../interfaces/pokemon';

type Data = {
  name: string;
};
interface QueryParams extends NextApiRequest {
  query: {
    id:string
  };
}

export default async function pokemonId(
  req: QueryParams,
  res: NextApiResponse<any>
) {
    // console.log(req.query);
    const {id}=req.query as {id:string}
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  res.status(200).json(data);
}
