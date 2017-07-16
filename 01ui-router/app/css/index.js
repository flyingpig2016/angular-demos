import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'page': {
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'paddingTop': [{ 'unit': 'px', 'value': 200 }],
    'position': 'absolute',
    'textAlign': 'center',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'page h1': {
    'fontSize': [{ 'unit': 'px', 'value': 60 }]
  },
  'page a': {
    'marginTop': [{ 'unit': 'px', 'value': 50 }]
  },
  'hello': {
    'background': '#00D0BC',
    'color': '#FFFFFF'
  },
  'list': {
    'background': '#E59400',
    'color': '#FFFFFF'
  },
  'ng-enter': {
    'zIndex': '8888'
  },
  'ng-leave': {
    'zIndex': '9999'
  },
  'hellong-enter': {
    'animation': 'scaleUp 0.5s both ease-in'
  },
  'hellong-leave': {
    'transformOrigin': '0% 0%',
    'animation': 'rotateFall 1s both ease-in'
  },
  'listng-enter': {
    'animation': 'slideInRight 1s both ease-in'
  },
  'listng-leave': {
    'animation': 'slideOutLeft 0.5s both ease-in'
  }
});
