
import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import Image from 'next/image'

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  // console.log(pokemons);

  return (
    <Layout title='Listado de Pokemons'>
      <div className={styles.container}>
        <h1>Hola mundo</h1>
        <Button color={'gradient'}>gato</Button>
      </div>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon, i) => (
          <Grid xs={6} sm={3} xl={1} key={pokemon.id}>
            <Card hoverable clickable>
              <Card.Body css={{ p: 1 }}>
                <Card.Image
                  src={pokemon.imagen}
                  width="100%"
                  height={140}
                />
              </Card.Body>
              <Card.Footer>
                <Row justify='space-between'>
                  <Text transform='capitalize'>{pokemon.name}</Text>
                  <Text>#{pokemon.id}</Text>
                </Row>
              </Card.Footer>

            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // fetching poke api limit 150 offset 200
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=400&offset=600');
  // console.log(data.results);

  const pokemon = data.results.map(pokemon => {
    pokemon.id = parseInt(pokemon.url.split('/')[6]);
    pokemon.imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    // pokemon.imagen=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    if(pokemon.id>649){
      pokemon.imagen=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    }
    return {
      ...pokemon,
    };
  });

  return {
    props: {
      pokemons: [...pokemon],
    }
  }
}

export default HomePage
