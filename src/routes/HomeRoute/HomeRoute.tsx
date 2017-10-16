
import * as React from 'react'
import * as RX from 'reactxp'
import { NavigationScreenProps } from 'react-navigation'

import Display from 'components/Display'
import Hello from 'containers/Hello'
import { mainView } from 'commonStyles'

export default class HomeScreen extends React.Component<NavigationScreenProps<void>, {}> {
  static navigationOptions = {
    title: 'Welcome'
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <RX.View style={mainView}>
        <Display />
        <Hello />
      </RX.View>
    )
  }
}
