import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'

export const lightTheme = createTheme({
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
    background: {
      default: grey[300] ,
    },
    mode: 'light',
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {},
    }
  }
})
