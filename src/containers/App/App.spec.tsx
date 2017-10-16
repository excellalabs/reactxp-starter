
import 'jest'
import 'react-native'
import * as React from 'react'
import OriginalApp from '.'

type AppType = typeof OriginalApp

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer'

const importModule = (): AppType => {
  return require('.').default
}

const mockedComponents = [
  'containers/Router',
  'redux-store'
]

const defaultMocks = [
  'react-redux'
]

const allMocks = mockedComponents.concat(defaultMocks)

describe('<App />', () => {
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
      const App = importModule()
      const tree = renderer.create(
        <App />
      )

      expect(tree).toMatchSnapshot()
    })
  })
})
