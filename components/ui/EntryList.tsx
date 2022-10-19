import { DragEvent, FC, useContext, useMemo } from "react"

import { List, Paper } from "@mui/material"
import { EntriesStatus } from "../../interfaces"
import { EntryCard } from "./"

import { EntriesContext } from '../../context/entries'
import { UIContext } from "../../context/ui"

import styles from './EntryList.module.css'

interface Props {
  status: EntriesStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext )
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries, status ] )

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text/plain')

    const entry = entries.find( entry => entry._id === id )!
    updateEntry({ ...entry, status })
    endDragging()
  }

  return (
    <div 
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
      <Paper sx={{
        height: 'calc(100vh - 220px)',
        overflowY: 'auto',
        backgroundColor: 'transparent',
        padding: '1px 5px',
      }}>
        <List sx={{
          opacity: isDragging ? 0.5 : 1,
          transition: 'opacity 0.2s ease-in-out',
        }}>
          {
            entriesByStatus.map( entry => (
              <EntryCard key={ entry._id } entry={ entry } />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
