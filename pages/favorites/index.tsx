import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/Layout';
import { FavoritePokemon } from '../../components/pokemon';
import NoFavorites from '../../components/ui/NoFavorites';
import localFavorites from '../../utils/localFavorites';

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  useEffect(() => {
    setFavorites(localFavorites.pokemons())
  }, [])

  return (
    <Layout title='Pokemons - Favoritos'>

      {
        favorites.length === 0 ?
          <NoFavorites />
          :
          (
            <FavoritePokemon pokemons={favorites} />
          )
      }
    </Layout>
  )
}
