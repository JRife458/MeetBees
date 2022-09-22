// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import GetAllGroups from "./components/GetAllGroups";
import GetSingleGroup from './components/GetSingleGroup'
import UpdateGroup from "./components/UpdateGroup";
import GetAllEvents from "./components/GetAllEvents";
import GetSingleEvent from './components/GetSingleEvent'
import HomePage from "./components/Home";

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
        <div className="site-container">
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/groups'>
            <GetAllGroups />
          </Route>
          <Route path='/groups/:groupId/update'>
            <UpdateGroup />
          </Route>
          <Route path='/groups/:groupId'>
            <GetSingleGroup />
          </Route>
          <Route exact path='/events'>
            <GetAllEvents />
          </Route>
          <Route path='/events/:eventId'>
            <GetSingleEvent />
          </Route>
        </Switch>
        </div>
      )}
    </>
  );
}

export default App;
