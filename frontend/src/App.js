// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import GetAllGroups from "./components/GetAllGroups";
import GetSingleGroup from './components/GetSingleGroup'
import CreateGroup from "./components/CreateGroup";
import UpdateGroup from "./components/UpdateGroup";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/groups'>
            <GetAllGroups />
          </Route>
          <Route exact path='/groups/create'>
            <CreateGroup />
          </Route>
          <Route path='/groups/:groupId/update'>
            <UpdateGroup />
          </Route>
          <Route path='/groups/:groupId'>
            <GetSingleGroup />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
