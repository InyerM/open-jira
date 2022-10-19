import { useContext, useState } from 'react'

import { Icon, Button, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import styles from './RecycleBin.module.css'

import { UIContext } from '../../context/ui'
import { EntriesContext } from '../../context/entries'

export const RecycleBin = () => {
  const { isDragging, endDragging } = useContext( UIContext )
  const { removeEntry } = useContext( EntriesContext )
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const onDragOver = ( e: React.DragEvent<HTMLDivElement> ) => {
    setIsDraggingOver(true)
    e.preventDefault()
  }

  const onDragLeave = ( e: React.DragEvent<HTMLDivElement> ) => {
    if ( e.currentTarget.contains( e.relatedTarget as Node ) ) return

    setIsDraggingOver(false)
    e.preventDefault()
  }

  const onDrop = ( e: React.DragEvent<HTMLDivElement> ) => {
    const id = e.dataTransfer.getData('text/plain')
    removeEntry(id)
    setIsDraggingOver(false)
    endDragging()
  }

  return (
    <div
      className={ `${ isDragging ? styles.show : styles.hide } ${ styles.recycleBin } ${ isDraggingOver ? styles.draggingOver : '' }` }
      onDragOver={ onDragOver }
      onDragLeave={ onDragLeave }
      onDrop={ onDrop }
    >
      <Button 
        startIcon={ <Icon><DeleteOutlineIcon /></Icon> }
        variant='contained'
        color='error'
      >
        <Typography textTransform='capitalize'>Delete</Typography>
      </Button>
    </div>
  )
}

