import { EntriesState } from './EntriesProvider'
import { Entry } from '../../interfaces'

type EntriesAction = 
  { type: 'ENTRIES_ADD', payload: Entry } |
  { type: 'ENTRIES_REMOVE', payload: string } |
  { type: 'ENTRIES_UPDATE', payload: Entry } |
  { type: 'ENTRIES_CLEAR', payload: Entry } |
  { type: 'ENTRIES_REFRESH', payload: Entry[] }

export const entriesReducer = (state: EntriesState, action: EntriesAction): EntriesState => {
  switch (action.type) {
    case 'ENTRIES_ADD':
      return {
        ...state,
        entries: [ ...state.entries, action.payload ],
      }
    case 'ENTRIES_UPDATE':
      return {
        ...state,
        entries: state.entries.map(entry => entry._id === action.payload._id ? action.payload : entry),
      }
    case 'ENTRIES_REMOVE':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload),
      }
    case 'ENTRIES_CLEAR':
      return {
        ...state,
        entries: [],
      }
    case 'ENTRIES_REFRESH':
      return {
        ...state,
        entries: [ ...action.payload ],
      }
    default:
      return state
  }
}