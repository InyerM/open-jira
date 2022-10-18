import { ChangeEvent, useContext, useState } from "react"

import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import { EntriesContext } from '../../context/entries'
import { UIContext } from "../../context/ui"

export const NewEntry = () => {

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const { addEntry } = useContext(EntriesContext)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSave = () => {
    if( inputValue.length === 0 ) return

    addEntry(inputValue)
    setInputValue('')
    setIsAddingEntry(false)
    setTouched(false)
  }

  const onCancel = () => {
    setInputValue('')
    setIsAddingEntry(false)
    setTouched(false)
  }

  return (
    <Box sx={{
      marginBottom: 2,
      paddingX: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      {
        isAddingEntry
        ? (
          <>
            <TextField 
              fullWidth 
              sx={{ margin: '2px 0' }}
              placeholder='New entry'
              autoFocus
              multiline
              label='New entry'
              helperText={ touched && inputValue.length <= 0 && 'This field is required' }
              variant="outlined"
              value={ inputValue }
              onChange={ handleChange }
              error={ touched && inputValue.length <= 0 }
              onBlur={ () => setTouched(true) }
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>  
              <Button 
                variant="text"
                onClick={ onCancel }
              >
                Cancel
              </Button>
              <Button 
                variant="outlined" 
                color="secondary"
                endIcon={<SaveOutlinedIcon />}
                onClick={ onSave }
              >
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Button 
              startIcon={ <AddCircleOutlineOutlinedIcon /> }
              fullWidth
              variant='outlined'
              onClick={ () => setIsAddingEntry(true) }
            >
              Add Task
            </Button>
          </>
        )
      }
    </Box>
  )
}
