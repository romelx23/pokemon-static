import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts/Layout';
import { GetStaticProps, NextPage } from 'next';
import confetti from 'canvas-confetti'

interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const {name,sprites,id}=pokemon;
    const [isInFavorites, setisInFavorites] = useState<boolean>(false);
    const image=sprites.other?.dream_world.front_default || sprites.other?.['official-artwork'].front_default || './no-image.png';
    useEffect(() => {
        setisInFavorites(localFavorites.existInFavorites(id));
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
        <Layout title={name} img={image}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable>
                        <Card.Body>
                            <Card.Image
                                src={sprites.other?.dream_world.front_default || sprites.other?.['official-artwork'].front_default || './no-image.png'}
                                alt={name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1>{name}</Text>
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
                                    src={sprites.front_default || './no-image.png'}
                                    alt={name}
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
import { GetStaticPaths } from 'next'
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces/pokemon';
import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '../../utils';
import { PokemonListResponse } from '../../interfaces/pokemon-list';

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const {data:{results:pokemons}} = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=150&offset=601`);//[601....750]
    // console.log(pokemons);
    return {
        paths: pokemons.map(pokemon => ({ params: { name: pokemon.name } })),//[{params:{name:pikachu}},{params:{name:pikachu},{}]
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }
    // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

    // const pokemon = {
    //     id:data.id,
    //     name: data.name,
    //     sprites: data.sprites,
    // }

    return {
        props: {
            pokemon:await getPokemonInfo(name)
        }
    }
}

export default PokemonPage;