
import 'react-native'
import * as React from 'react'
import { storiesOf, action, linkTo } from '@storybook/react-native'

import Display from '.'

storiesOf('Display', module)
  .add('main display', () => (
    <Display />
  ))
