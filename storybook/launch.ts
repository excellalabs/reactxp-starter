import { AppRegistry } from 'react-native'
import * as RX from 'reactxp'
import { getStorybookUI, configure } from '@storybook/react-native'
import { setOptions } from '@storybook/addon-options'
import { loadStories } from './storyLoader'

// Must use settimeout here for the time being
// https://github.com/storybooks/storybook/issues/1192
setTimeout(() => {
  setOptions({
    name: 'test',
    sortStoriesByKind: true,
    hierarchySeparator: /\./
  })
}, 0)

RX.International.forceRTL(true)

// import stories
configure(loadStories, module)

const StorybookUI = getStorybookUI({port: 7007, host: 'localhost'})
AppRegistry.registerComponent('yourapp', () => StorybookUI)
