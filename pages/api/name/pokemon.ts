// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { pokeApi } from "../../../api";
import { Pokemon } from '../../../interfaces/pokemon';

type Data = {
  name: string;
};
interface QueryParams extends NextApiRequest {
  query: {
    name:string
  };
}

export default async function pokemonId(
  req: QueryParams,
  res: NextApiResponse<any>
) {
    // console.log(req.query);
    const {name}=req.query;
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

  res.status(200).json(data);
}
