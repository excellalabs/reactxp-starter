
import { Action, Reducer } from 'redux'

export interface ActionMap<S> {
  [actionType: string]: Reducer<S>
}

export function buildReducer<S> (initialState: S, map: ActionMap<S>, defaultReducer: Reducer<S> = (prev: S) => prev): Reducer<S> {
  return (prev: S = initialState, action: Action): S => {
    let actor = map[action.type]
    if (typeof actor === 'function') {
      return actor(prev, action)
    } else {
      return defaultReducer(prev, action)
    }
  }
}
