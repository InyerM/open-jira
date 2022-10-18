import { FC, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
  entries: Entry[]
}

interface Props {
  children: React.ReactNode
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
    _id: uuidv4(),
    description: 'Entry 1 - Pending',
    status: 'pending',
    createdAt: Date.now(),
    },
    {
    _id: uuidv4(),
    description: 'Entry 2 - finished',
    status: 'finished',
    createdAt: Date.now() - 500000,
    },
    {
    _id: uuidv4(),
    description: 'Entry 3 - in-progress',
    status: 'in-progress',
    createdAt: Date.now() - 1000000,
    },
    {
    _id: uuidv4(),
    description: 'Entry 4 - Pending',
    status: 'pending',
    createdAt: Date.now() - 100000,
    },
  ]
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE )

  const addEntry = ( description: string ) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    }

    dispatch({
      type: 'ENTRIES_ADD',
      payload: newEntry,
    })
  }

  const updateEntry = ( entry: Entry ) => {
    dispatch({
      type: 'ENTRIES_UPDATE',
      payload: entry,
    })
  }

  return (
    <EntriesContext.Provider value={{ 
      ...state,

      // methods
      addEntry,
      removeEntry: () => {},
      updateEntry,
    }}>
      { children }
    </EntriesContext.Provider>
  )
}
