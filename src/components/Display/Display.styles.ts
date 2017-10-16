
import * as RX from 'reactxp'

import { textGrey } from 'commonStyles/colors'

export default {
  container: RX.Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  welcome: RX.Styles.createTextStyle({
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }),
  instructions: RX.Styles.createTextStyle({
    textAlign: 'center',
    color: textGrey,
    marginBottom: 5
  })
}
