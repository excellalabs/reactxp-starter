
import 'jest'

import sampleAction from 'actions/sampleAction'

import sampleReducer, { INITIAL_STATE } from '../sampleReducer'

describe('sampleReducer', () => {
  describe('init', () => {
    it('should return the initial state', () => {
      const actual = sampleReducer(undefined, { type: 'INIT' })
    })
  })
  describe('sampleAction', () => {
    const names = [
      'John',
      'Jacob',
      'Jingleheimer',
      'Schmidt'
    ]

    names.forEach(name => {
      it(`should change the name to ${name}`, () => {
        const expected = name
        const actual = sampleReducer(INITIAL_STATE, sampleAction({
          name
        }))

        expect(actual.name).toEqual(expected)
      })
    })
  })
})
