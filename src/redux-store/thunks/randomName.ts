
import { Dispatch } from 'redux'

import sampleAction from 'actions/sampleAction'
import { getRandomName } from 'services/nameService'
import { getName } from 'queries/sampleQueries'
import AppState from 'types/AppState'

export default () => (dispatch: Dispatch<AppState>, getState: () => AppState) => {
  return getRandomName()
    .then(name => {
      return dispatch(sampleAction({ name }))
    })
    .then(() => {
      return getName(getState())
    })
}
