// Frameworks
import { REHYDRATE } from 'redux-persist/constants';
import { NavigationActions } from 'react-navigation';

// Navigators
import { MainStackNavigator } from '../navigators/MainStackNavigator';

// reducer initialization code
const initialNavState = MainStackNavigator.router.getStateForAction(
  NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({
      routeName: 'HomeDrawer',
      }),
    ],
  })
);

// reducer code
const navigationReducer = (state = initialNavState, action) => {
  let nextState;
  const { routes, index } = state;
  switch (action.type) {
    case REHYDRATE:
      // convert persisted data to Immutable and confirm rehydration
      if (!action.payload.auth || !action.payload.auth.token) {
        const { routes, index } = state;
        if (routes[index].routeName !== 'Login') {
          nextState = MainStackNavigator.router.getStateForAction(
            NavigationActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({
                routeName: 'Login',
                }),
              ],
            }),
            state,
          );
        }
      }
      break;
    case 'LOGOUT':
      if (routes[index].routeName !== 'Login') {
        nextState = MainStackNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
              routeName: 'Login',
              }),
            ],
          }),
          state,
        );
      }
      break;
    default:
      nextState =  MainStackNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navigationReducer;