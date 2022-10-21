import { FC, useEffect, useReducer } from 'react'
import { entriesApi } from '../../apis'
import { useSnackbar } from 'notistack'

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'
import { snackbarConfig } from '../../config'

export interface EntriesState {
  entries: Entry[]
}

interface Props {
  children: React.ReactNode
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE )
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const addEntry = async ( description: string ) => {
    try{
      const { data } = await entriesApi.post<Entry>( '/entries', { description } )
  
      dispatch({
        type: 'ENTRIES_ADD',
        payload: data,
      })

      enqueueSnackbar('Entry added', {
        ...snackbarConfig,
        variant: 'success',
        onClose: () => closeSnackbar()
      })
    } catch (error) {
      enqueueSnackbar('Error adding entry', {
        ...snackbarConfig,
        variant: 'error',
        onClose: () => closeSnackbar()
      })
    }
  }

  const updateEntry = async ( entry: Entry, showSnackBar = false ) => {
    try {
      await entriesApi.put<Entry>( `/entries/${ entry._id }`, {
        description: entry.description,
        status: entry.status,
      } )
      dispatch({
        type: 'ENTRIES_UPDATE',
        payload: entry,
      })

      if ( showSnackBar ) {
        enqueueSnackbar('Entry updated', {
          ...snackbarConfig,
          variant: 'success',
          onClose: () => closeSnackbar(),
        })
      } 

    } catch (error) {
      enqueueSnackbar('Error updating entry', {
        ...snackbarConfig,
        variant: 'error',
        onClose: () => closeSnackbar(),
      })
    }
  }

  const removeEntry = async ( id: string ) => {
    try {
      await entriesApi.delete<Entry>( `/entries/${ id }` )
      dispatch({
        type: 'ENTRIES_REMOVE',
        payload: id,
      })

      enqueueSnackbar('Entry deleted', {
        ...snackbarConfig,
        variant: 'success',
        onClose: () => closeSnackbar(),
      })

    } catch (error) {
      enqueueSnackbar('Error deleting entry', {
        ...snackbarConfig,
        variant: 'error',
        onClose: () => closeSnackbar(),
      })
    }
  }

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>('/entries')
      dispatch({
        type: 'ENTRIES_REFRESH',
        payload: data,
      })
    } catch (error) {
      enqueueSnackbar('Error refreshing entries', {
        ...snackbarConfig,
        variant: 'error',
        onClose: () => closeSnackbar(),
      })
    }
  }


  useEffect(() => {
    refreshEntries()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <EntriesContext.Provider value={{ 
      ...state,

      // methods
      addEntry,
      removeEntry,
      updateEntry,
    }}>
      { children }
    </EntriesContext.Provider>
  )
}
