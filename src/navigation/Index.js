import React from 'react';
import Route from './Route';
import {AuthProvider} from './AuthProvider'

const Index = () => {
  return(
    <AuthProvider>
        <Route />
    </AuthProvider>
  );
};

export default Index;
