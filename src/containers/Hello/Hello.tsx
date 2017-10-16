
import * as React from 'react'
import * as RX from 'reactxp'
import { connect, Dispatch } from 'react-redux'

import AppState from 'types/AppState'
import randomName from 'thunks/randomName'

import styles from './Hello.styles'

interface StateProps {
  name: string
}

interface DispatchProps {
  chooseRandomName: () => void
}

type Props = StateProps & DispatchProps

export const HelloBase = (props: Props) => (
  <RX.View style={styles.container}>
    <RX.Text style={styles.nameText}>
      Hello, {props.name}
    </RX.Text>
    <RX.Button onPress={props.chooseRandomName} style={styles.button}>
      <RX.Text style={styles.buttonText}>
        Random Name
      </RX.Text>
    </RX.Button>
  </RX.View>
)

const withRedux = connect(
  ({ sample: { name } }: AppState): StateProps => {
    return {
      name
    }
  },
  (dispatch: Dispatch<AppState>): DispatchProps => {
    return {
      chooseRandomName: () => dispatch(randomName())
    }
  }
)

export default withRedux(HelloBase)
