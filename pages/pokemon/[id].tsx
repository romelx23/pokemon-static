import { useRouter } from 'next/router';
import React from 'react'
import { Layout } from '../../components/layouts/Layout';
import { GetStaticProps, NextPage } from 'next';

interface Props {
  pokemon:Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter()
  console.log(router.query);

  return (
    <Layout title='Algun Pokemon'>
      <h1>{pokemon.id}.-{pokemon.name}</h1>
      {/* <img src={pokemon.sprites.front_default | ''} alt="" /> */}
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from 'next'
import { pokeApi } from '../../api';
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { Pokemon } from '../../interfaces/pokemon';

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, i) => `${i + 601}`);
  console.log(pokemons151);
  return {
    paths:pokemons151.map(id => ({ params: { id } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id}=params as {id:string}
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  return {
    props: {
      pokemon:data
    }
  }
}

export default PokemonPage;