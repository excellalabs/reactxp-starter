
import 'jest'
import 'react-native'
import * as React from 'react'
import OriginalDisplay from '.'

type DisplayType = typeof OriginalDisplay

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer'

const importModule = (): DisplayType => {
  const disp = require('.').default
  return disp
}

const mockedComponents = [
]

const defaultMocks = [
]

const allMocks = mockedComponents.concat(defaultMocks)

describe('<Display />', () => {
  beforeEach(() => {
    jest.resetModules()
    mockedComponents.forEach(component => {
      jest.setMock(component, component)
    })
    defaultMocks.forEach(component => {
      jest.setMock(component, jest.genMockFromModule(component))
    })
  })

  afterEach(() => {
    allMocks.forEach(component => {
      jest.unmock(component)
    })
  })

  describe('snapshots', () => {
    it('renders correctly', () => {
      const Display = importModule()
      const tree = renderer.create(
        <Display />
      )

      expect(tree).toMatchSnapshot()
    })
  })
})
