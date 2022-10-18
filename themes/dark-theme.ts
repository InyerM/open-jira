import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#00bbf9',
    },
    secondary: {
      main: '#8338ec',
    },
    error: {
      main: red.A400,
    },
    mode: 'dark',
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#00bbf9',
        },
      },
    }
  }
})
