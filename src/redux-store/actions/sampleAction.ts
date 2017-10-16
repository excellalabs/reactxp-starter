
import { Action } from 'redux'

export const type = 'SAMPLE'

export interface SampleOptions {
  name: string
}

export type SampleAction = SampleOptions & Action

export default (options: SampleOptions): SampleAction => ({
  ...options,
  type
})
