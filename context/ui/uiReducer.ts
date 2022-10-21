import { UIState } from './UIProvider'

type UIActionType = 
  | { type: 'UI_OPEN_SIDEBAR' }
  | { type: 'UI_CLOSE_SIDEBAR' }
  | { type: 'UI_SET_IS_ADDING_ENTRY', payload: boolean }
  | { type: 'UI_START_DRAGGING_ENTRY' }
  | { type: 'UI_END_DRAGGING_ENTRY' }
  | { type: 'UI_OPEN_DIALOG' }
  | { type: 'UI_CLOSE_DIALOG' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI_OPEN_SIDEBAR':
      return {
        ...state,
        sidemenuOpen: true
      }
    case 'UI_CLOSE_SIDEBAR':
      return {
        ...state,
        sidemenuOpen: false
      }
    case 'UI_SET_IS_ADDING_ENTRY':
      return {
        ...state,
        isAddingEntry: action.payload
      }
    case 'UI_START_DRAGGING_ENTRY':
      return {
        ...state,
        isDragging: true
      }
    case 'UI_END_DRAGGING_ENTRY':
      return {
        ...state,
        isDragging: false
      }
    case 'UI_OPEN_DIALOG':
      return {
        ...state,
      isDialogOpen: true
      }
    case 'UI_CLOSE_DIALOG':
      return {
        ...state,
        isDialogOpen: false
      }

    default:
      return state
  }
}