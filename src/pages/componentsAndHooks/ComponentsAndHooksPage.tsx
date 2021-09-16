import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import SimpleNotesWebComponent from "./webComponentNotes/SimpleNotesWebComponent";
import SimpleNotes from "./simpleNotes/SimpleNotes";

function ComponentsAndHooksPage() {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${path}/web-component`}>
          <SimpleNotesWebComponent />
        </Route>
        <Route path={`${path}/notes`}>
          <SimpleNotes />
        </Route>
        <Route path={path}>
          <Redirect to={`${path}/notes`} />
        </Route>
      </Switch>
    </>
  );
}

export default ComponentsAndHooksPage;
