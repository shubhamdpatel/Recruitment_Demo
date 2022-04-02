import React from 'react';
import Navigator from './navigation/navigator';

//Redux
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './redux/rootReducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
