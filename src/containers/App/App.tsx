/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react'
import * as RX from 'reactxp'
import { Provider } from 'react-redux'
import store from 'redux-store'

import Router from 'containers/Router'

export default class App extends RX.Component<{}> {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
