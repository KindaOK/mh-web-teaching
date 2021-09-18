import React from "react";
import { loadWords } from "./utils";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "./autocomplete/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
}));

function AsyncPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete words={loadWords()} maxWordsVisible={10} />
    </div>
  );
}

export default AsyncPage;
