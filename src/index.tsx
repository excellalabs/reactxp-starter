
import * as React from 'react'
import * as RX from 'reactxp'
import App from 'containers/App'

import { AppRegistry } from 'react-native'

AppRegistry.registerComponent('yourapp', () => App)
RX.App.initialize(true, true)

RX.UserInterface.setMainView(<App />)
