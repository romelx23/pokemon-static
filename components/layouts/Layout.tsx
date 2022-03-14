import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '../ui';
interface Props{
    title?: string;
}

export const Layout: FC<Props> = ({ children,title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name='author' content='Romel Alexis' />
                <meta name='description' content={`Información sobre el pokemon ${title}`} />
                <meta name='keywords' content={` ${title} pokemon, pokedex`} />
            </Head>
                {/* Nabvar */}
                <Navbar/>
            <main style={{
                padding:'0 20px',
            }}>
                {children}
            </main>
        </>
    )
}
