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
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
}));

function ComponentsAndHooksPage() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  return (
    <div className={classes.root}>
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
    </div>
  );
}

export default ComponentsAndHooksPage;
