import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import AppLoader from './app/AppLoader';

const App = () => (
  <Provider store={store}>
    <AppLoader />
  </Provider>
);

export default App;
