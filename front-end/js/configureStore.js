
// Framework
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

// Reducers
import reducer from './reducers';

/**
 * @module configureStore
 */

/**
* Configure store
*
* @param {func} - Configure store callback.
* @return {object} - Object that represents the initial state.
*/
export default function configureStore(onCompletion) {
  const enhancer = compose(
    applyMiddleware(thunk),
    autoRehydrate(),
    devTools({
      name: 'reactnativefullstack', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, 
    { 
      storage: AsyncStorage,
      blacklist: ['apollo', 'nav'],
    }, onCompletion);

  return store;
}
