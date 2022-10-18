import { useContext } from 'react'

import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

import { UIContext } from '../../context/ui'

const menuItems: string[] = [
  'Inbox',
  'Starred',
  'Send email',
  'Drafts',
]

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext( UIContext )

  return (
    <Drawer
      anchor='left'
      open={ sidemenuOpen }
      onClose={ closeSideMenu }
    >
      <Box sx={{
        width: 250,
      }}>
        <Box sx={{
          padding: '10px 20px'
        }}>
          <Typography variant='h4' sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
        </Box>
        <List>
          {
            menuItems.map((item, index) => (
              <ListItem key={ index } button >
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                </ListItemIcon>
                <ListItemText primary={ item } />
              </ListItem>
            ))
          }
        </List>
        <Divider />
      </Box>
    </Drawer>
  )
}
