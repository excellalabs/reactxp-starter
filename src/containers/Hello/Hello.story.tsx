
import 'react-native'
import * as React from 'react'
import { storiesOf, linkTo } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'

import { HelloBase } from './Hello'

storiesOf('Hello', module)
  .add('shows name "Joseph"', () => (
    <HelloBase name='Joseph' chooseRandomName={action('random name')} />
  ))
