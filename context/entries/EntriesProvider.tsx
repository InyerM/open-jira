import { FC, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { entriesApi } from '../../apis'

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

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

  const addEntry = async ( description: string ) => {
    try{
      const { data } = await entriesApi.post<Entry>( '/entries', { description } )
  
      dispatch({
        type: 'ENTRIES_ADD',
        payload: data,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateEntry = async ( entry: Entry ) => {
    try {
      await entriesApi.put<Entry>( `/entries/${ entry._id }`, {
        description: entry.description,
        status: entry.status,
      } )
      dispatch({
        type: 'ENTRIES_UPDATE',
        payload: entry,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const removeEntry = async ( id: string ) => {
    try {
      await entriesApi.delete<Entry>( `/entries/${ id }` )
      dispatch({
        type: 'ENTRIES_REMOVE',
        payload: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({
      type: 'ENTRIES_REFRESH',
      payload: data,
    })
  }


  useEffect(() => {
    refreshEntries()
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
