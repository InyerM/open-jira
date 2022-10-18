import { createContext } from 'react'

interface ContextProps {
  sidemenuOpen: boolean
  openSideMenu: () => void
  closeSideMenu: () => void

  isAddingEntry: boolean
  setIsAddingEntry: ( value: boolean ) => void

  isDragging: boolean
  startDragging: () => void
  endDragging: () => void
}

export const UIContext = createContext( {} as ContextProps )