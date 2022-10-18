import { UIState } from './UIProvider'

type UIAction = { 
  type: 'UI_OPEN_SIDEBAR' | 'UI_CLOSE_SIDEBAR'
  payload?: boolean 
}

export const uiReducer = (state: UIState, action: UIAction): UIState => {
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
    default:
      return state
  }
}