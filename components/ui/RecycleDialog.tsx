import { FC, useContext, useState } from "react"

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { UIContext } from '../../context/ui'

interface Props {
  onClose : () => void
}

export const RecycleDialog: FC<Props> = ({ onClose }) => {

  const { isDialogOpen, closeDialog } = useContext(UIContext)

  const handleClose = () => {
    closeDialog()
    onClose()
  }

  return (
    <>
      <Dialog
        open={ isDialogOpen }
        onClose={ handleClose }
      >
        <DialogTitle>
          Are you sure you want to delete this entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => closeDialog() }>Cancel</Button>
          <Button onClick={ handleClose } autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
