import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  isDialogOpen: boolean
}

interface Props {
  children: React.ReactNode
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  isDialogOpen: false
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

  const openSideMenu = () => {
    dispatch({
      type: 'UI_OPEN_SIDEBAR'
    })
  }

  const closeSideMenu = () => {
    dispatch({
      type: 'UI_CLOSE_SIDEBAR'
    })
  }

  const setIsAddingEntry = ( value: boolean ) => {
    dispatch({
      type: 'UI_SET_IS_ADDING_ENTRY',
      payload: value
    })
  }

  const startDragging = () => {
    dispatch({
      type: 'UI_START_DRAGGING_ENTRY'
    })
  }

  const endDragging = () => {
    dispatch({
      type: 'UI_END_DRAGGING_ENTRY'
    })
  }

  const openDialog = () => {
    dispatch({
      type: 'UI_OPEN_DIALOG'
    })
  }

  const closeDialog = () => {
    dispatch({
      type: 'UI_CLOSE_DIALOG'
    })
  }

  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      
      setIsAddingEntry,

      startDragging,
      endDragging,

      openDialog,
      closeDialog
    }}>
      { children }
    </UIContext.Provider>
  )
}
