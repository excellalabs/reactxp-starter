
import * as RX from 'reactxp'

import * as colors from './colors'

export const mainView = RX.Styles.createViewStyle({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.background
})

export const button = RX.Styles.createButtonStyle({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  backgroundColor: colors.primary,
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 10,
  paddingBottom: 10
})

export const buttonText = RX.Styles.createTextStyle({
  textAlign: 'center',
  color: colors.white,
  fontSize: 20
})
