import { DragEvent, FC, useContext } from "react"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "../../interfaces"
import { UIContext } from "../../context/ui"

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', entry._id)
    startDragging()
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text/plain')
    console.log(id)
    endDragging()
  }

  return (
    <Card sx={{
      marginBottom: 1,
      }}
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {
              entry.description
            }
          </Typography>
        </CardContent>
        <CardActions sx={{
          justifyContent: 'end',
          display: 'flex',
          paddingRigth: 5,
        }}>
          <Typography variant="body2">
            3 minutes ago
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
