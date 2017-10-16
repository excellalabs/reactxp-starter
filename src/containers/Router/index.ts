
import * as React from 'react'
import * as RX from 'reactxp'
import { StackNavigator, NavigationScreenRouteConfig, NavigationComponent } from 'react-navigation'

import HomeRoute from 'routes/HomeRoute'

const RouteNames = Object.freeze({
  Home: 'HOME'
})

type RouteMap = { [key: string]: NavigationScreenRouteConfig }
const Routes: RouteMap = {
  [RouteNames.Home]: { screen: HomeRoute as NavigationComponent },
}

export default StackNavigator(Routes)
