import { Container, Image, Text } from '@nextui-org/react';
import React from 'react'

export default function NoFavorites() {
    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc( 100vh - 100px )',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
            }}
        >
            <Text h2>No hay favoritos</Text>
            <Image
                src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg'
                width={250}
                height={250}
                css={{
                    opacity: 0.2
                }}
                alt='No hay favoritos'
            />
        </Container>
    )
}
