import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Onboarding from '../components/Onboarding';

const AppRouter = () => {

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" exact={true} component={Onboarding} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
