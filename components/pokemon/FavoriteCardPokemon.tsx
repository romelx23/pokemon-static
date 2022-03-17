import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

interface Props{
    id:number,
}

const FavoriteCardPokemon = ({id}:Props) => {
    // router to pokemon
    const router = useRouter()

    const onFavoriteClick = (id: number) => {
        router.push(`/pokemon/${id}`)
    }
    return (
        <Grid xs={6} sm={3} md={2} onClick={()=>onFavoriteClick(id)}>
            <Card hoverable clickable css={{ padding: 10 }}>
                <Card.Image
                    src={id < 649 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={`Pokemon ${id}`}
                    width={150}
                    height={150}
                />
            </Card>
        </Grid>
    )
}

export default FavoriteCardPokemon;
