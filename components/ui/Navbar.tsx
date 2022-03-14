import { useTheme,Text, Spacer } from '@nextui-org/react'
import Image from 'next/image';

export const Navbar = () => {
  const {theme}=useTheme();
  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 20px',
        backgroundColor: theme?.colors?.gray900.value,
    }}>
        <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png"
        width={70}
        height={70}
        alt='pokemon'
      />
        <Text color='white' h2>P</Text>
        <Text color='white' h3>okemón</Text>
        <Spacer css={{flex:1}}/>
        <Text color='white' h3>Favoritos</Text>
    </div>
  )
}
