import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
import React from 'react';
import Navigator from './src/navigation/navigator';
import {StatusBar} from 'react-native';
//Redux
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './src/redux/rootReducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Color from './src/constant/Color';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar animated={true} backgroundColor={Color.primary} />
      <Navigator />
    </Provider>
  );
};

export default App;
