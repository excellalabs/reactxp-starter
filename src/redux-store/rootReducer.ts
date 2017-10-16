
import { Action, combineReducers } from 'redux'
import AppState from 'types/AppState'

import sample from './reducers/sampleReducer'

const reducerMap: AppState = {
  sample
}

export default combineReducers<AppState>(reducerMap as any)
