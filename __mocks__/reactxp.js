
import * as React from 'react'

const identity = () => jest.fn((i) => i)
const asyncIdent = (i) => jest.fn(() => Promise.resolve(i))
const noop = jest.fn()

const subscribableEvent = () => {
  return {
    dispose: jest.fn(),
    subscribe: jest.fn(() => { unsubscribe: jest.fn() }),
    unsubscribe: jest.fn(),
    fire: jest.fn()
  }
}

// Components
export const ActivityIndicator = 'RX.ActivityIndicator'
export const Button = 'RX.Button'
export const Picker = 'RX.Picker'
export const GestureView = 'RX.GestureView'
export const Link = 'RX.Link'
export const Text = 'RX.Text'
export const TextInput = 'RX.TextInput'
export const View = 'RX.View'

// Objects
export const Alert = {
  show: jest.fn()
}

export const UserInterface = {
  setMainView: jest.fn(),
  useCustomScrollbars: jest.fn(),
  isHighPixelDensityScreen: jest.fn(() => false),
  getPixelRatio: jest.fn(() => 1)
}

export const Modal = {
  isDisplayed: jest.fn(() => false),
  show: jest.fn(),
  dismiss: jest.fn(),
  dismissAll: jest.fn()
}

export const Popup = {
  show: jest.fn(() => false),
  autoDismiss: jest.fn(),
  dismiss: jest.fn(),
  dismissAll: jest.fn()
}

export const Linking = {
  getInitialUrl: asyncIdent(),
  deepLinkRequestEvent: subscribableEvent(),
  openUrl: asyncIdent(),
  launchSms: asyncIdent(),
  launchEmail: asyncIdent()
}

export const Accessibility = {
  isScreenReaderEnabled: jest.fn(() => false),
  announceForAccessibility: jest.fn(),
  screenReaderChangedEvent: subscribableEvent()
}

export const Clipboard = {
  setText: jest.fn(),
  getText: asyncIdent('text')
}

export const Storage = {
  getItem: asyncIdent(),
  setItem: asyncIdent(),
  removeItem: asyncIdent(),
  clear: asyncIdent()
}

export const Location = {
  isAvailable: jest.fn(() => false),
  setConfiguration: jest.fn(),
  getCurrentPosition: asyncIdent({ 
    coords: {
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null
    },
    timestamp: 0
  }),
  watchPosition: asyncIdent(0),
  clearWatch: jest.fn()
}

export const Network = {
  isConnected: asyncIdent(false),
  getType: asyncIdent(0),
  connectivityChangedEvent: subscribableEvent()
}

export const Platform = {
  getType: () => 'test'
}

export const Input = {
  backButtonEvent: subscribableEvent(),
  keyDownEvent: subscribableEvent(),
  keyUpEvent: subscribableEvent(),
}

export const StatusBar = {
  isOverlay: jest.fn(() => false),
  setHidden: jest.fn(),
  setBarStyle: jest.fn(),
  setNetworkActivityIndicatorVisible: jest.fn(),
  setBackgroundColor: jest.fn(),
  setTranslucent: jest.fn(),
}

export const Styles = {
  combine: jest.fn((...args) => args),
  createViewStyle: identity(),
  createAnimatedViewStyle: identity(),
  createScrollViewStyle: identity(),
  createButtonStyle: identity(),
  createWebViewStyle: identity(),
  createTextStyle: identity(),
  createAnimatedTextStyle: identity(),
  createTextInputStyle: identity(),
  createAnimatedTextInputStyle: identity(),
  createImageStyle: identity(),
  createAnimatedImageStyle: identity(),
  createLinkStyle: identity(),
  createPickerStyle: identity(),
  getCssPropertyAliasesCssStyle: {},
}

export const UserPresence = {
  isUserPresent: jest.fn(() => false),
  userPresenceChangedEvent: subscribableEvent()
}

export const Animated = {
  Image: 'RX.Animated.Image',
  Text: 'RX.Animated.Text',
  TextInput: 'RX.Animated.TextInput',
  View: 'RX.Animated.View',
}

export const International = {
  allowRTL: jest.fn(),
  forceRTL: jest.fn(),
  isRTL: jest.fn(() => true),
}

export const Component = React.Component