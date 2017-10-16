/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react'
import * as RX from 'reactxp'

import styles from './Display.styles'

const instructionsHash: { [key: string]: string } = {
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
}

const instructions = instructionsHash[RX.Platform.getType()]

export default () => (
  <RX.View style={styles.container}>
    <RX.Text style={styles.welcome}>
      Your App
    </RX.Text>
    <RX.Text style={styles.instructions}>
      { instructions }
    </RX.Text>
  </RX.View>
)
