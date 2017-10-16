
import AppState from 'types/AppState'

export function getName (state: AppState): string {
  return state.sample.name
}
