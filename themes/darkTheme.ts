import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
        primary: '#0070f3',
    }, // override dark theme colors
  }
});