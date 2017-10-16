
import 'jest'
import 'react-native'
import * as React from 'react'
import * as RX from 'reactxp'
import { shallow, configure } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import OriginalHello, { HelloBase as OriginalHelloBase } from './Hello'

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer'

const importModule = (): typeof OriginalHello => {
  return require('.').default
}
const importBase = (): typeof OriginalHelloBase => {
  return require('./Hello').HelloBase
}

const mockedComponents = [
]

const defaultMocks = [
]

const allMocks = mockedComponents.concat(defaultMocks)

describe('<Hello />', () => {
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

  describe('base', () => {
    const names = [
      'World',
      'React',
      'Kevin',
      'Doguhan',
      'Stuart'
    ]

    describe('snapshots', () => {
      names.forEach(name => {
        it(`renders with the name ${name}`, () => {
          const HelloBase = importBase()
          const tree = renderer.create(
            <HelloBase name={name} chooseRandomName={jest.fn()} />
          )

          expect(tree).toMatchSnapshot()
        })
      })
    })

    // describe('user clicks the "Random Name" button', () => {
    //   it('should call chooseRandomName', () => {
    //     const callback = jest.fn()
    //
    //     const HelloBase = importBase()
    //     const tree = shallow(
    //       <HelloBase name={'World'} chooseRandomName={callback} />
    //     )
    //
    //     expect(callback).toHaveBeenCalledTimes(0)
    //
    //     tree.find(RX.Button).simulate('click')
    //     expect(callback).toHaveBeenCalledTimes(1)
    //   })
    // })
  })
})
