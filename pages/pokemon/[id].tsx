import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/Layout';
import { GetStaticProps, NextPage } from 'next';
import confetti from 'canvas-confetti'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setisInFavorites] = useState<boolean>(false);

  useEffect(() => {
    setisInFavorites(localFavorites.existInFavorites(pokemon.id));
  }, []);

  const handleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setisInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.other?.['official-artwork'].front_default || './no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
              <Text h2 css={{textAlign:'end'}}>#{pokemon.id}</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1>{pokemon.name}</Text>
              <Button
                ghost={!isInFavorites}
                color="gradient"
                onClick={handleFavorite}>
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default || './no-image.png'}
                  alt={pokemon.name}
                  width="100"
                  height={200}
                />
                <Image
                  src={pokemon.sprites.back_default || pokemon.sprites.other?.home.front_default || './no-image.png'}
                  alt={pokemon.name}
                  width="100"
                  height={200}
                />
                <Image
                  src={pokemon.sprites.front_shiny || './no-image.png'}
                  alt={pokemon.name}
                  width="100"
                  height={200}
                />
                <Image
                  src={pokemon.sprites.back_shiny || pokemon.sprites.other?.home.front_shiny || './no-image.png'}
                  alt={pokemon.name}
                  width="100"
                  height={200}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from 'next';
import { Pokemon } from '../../interfaces/pokemon';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '../../utils';

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(150)].map((value, i) => `${i + 601}`);
  console.log(pokemons151);
  return {
    paths: pokemons151.map(id => ({ params: { id } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon: await getPokemonInfo(id)
    },
    revalidate: 86400
  }
}

export default PokemonPage;