import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Onboarding from '../components/Onboarding';
import FirstStep from '../components/steps/firstStep'

const AppRouter = () => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  return (
    <BrowserRouter>
      <div className="container">

        <Switch>
          <Route
            render={(props) => (
              <FirstStep {...props} user={user} updateUser={updateUser} />
            )}
            path="/steps"
            exact={true}
          />
          <Route path="/" exact={true} component={Onboarding} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;

// {/* <Route render={() => <Redirect to="/" />} /> */ }