import { useTheme, Text, Spacer, Link } from '@nextui-org/react'
import Image from 'next/image';
import NextLink from 'next/link';

export const Navbar = () => {
  const { theme } = useTheme();
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
      <NextLink href='/' passHref>
        <Link css={{alignItems:'center'}}>
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png"
            width={70}
            height={70}
            alt='pokemon'
          />
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okemón</Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 1 }} />
      <NextLink href='/favorites' passHref>
        <Link>
          <Text color='white' h3>Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  )
}
