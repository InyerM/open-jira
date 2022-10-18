import { useContext } from 'react'

import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { UIContext } from '../../context/ui'

export const Navbar = () => {

  const { openSideMenu } = useContext( UIContext )
  
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={ openSideMenu }
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          OpenJira
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
