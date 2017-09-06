const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

/**
 * Login styles
 * @const {StyleSheet} - All the app component's styles
 * @memberof Login
 * @export styles
 */
export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 2,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  item: {
    borderColor: 'transparent'
  },
  icon: {
    color: 'red', marginTop: 5
  },
  text: {
    fontSize: 15, color: 'red'
  }
};
