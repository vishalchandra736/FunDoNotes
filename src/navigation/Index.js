import React from 'react';
import Route from './Route';
import {AuthProvider} from './AuthProvider';
import {Provider} from 'react-redux';
import store from '../redux/Store';

const Index = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </Provider>
  );
};

export default Index;
