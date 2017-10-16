
import * as RX from 'reactxp'

import { button, buttonText } from 'commonStyles'

export default {
  container: RX.Styles.createViewStyle({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  nameText: RX.Styles.createTextStyle({
    textAlign: 'center',
    color: '#110022',
    fontSize: 18,
    paddingBottom: 10
  }),
  button: [button],
  buttonText: [buttonText]
}
