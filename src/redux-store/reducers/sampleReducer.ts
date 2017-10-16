
import SampleState from 'types/SampleState'
import { type as SAMPLE_TYPE, SampleAction } from 'actions/sampleAction'

import { buildReducer } from '../actionMap'

export const INITIAL_STATE: SampleState = {
  name: 'World'
}

export default buildReducer(INITIAL_STATE, {
  [SAMPLE_TYPE]: (prev, { name }: SampleAction) => {
    return {
      ...prev,
      name
    }
  }
})
