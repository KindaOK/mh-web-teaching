import React from "react";
import { loadWords } from "./utils";
import { makeStyles } from "@material-ui/core";
import Autocomplete from "./autocomplete/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
    display: "flex",
  },
  article: {
    flex: "1",
  },
  code: {
    background: "whitesmoke",
    marginLeft: "16px",
  }
}));

const words = loadWords();
// the function is written as a promise, but it will immediately execute because it is not waiting on anything
const getWordsLocal = (input: string): Promise<string[]> => {
  const re = new RegExp(input);
  return new Promise((resolve) =>
    resolve(words.filter((word) => re.test(word)))
  );
};
const getWordsRemote = (input: string) => {
  return fetch(`http://localhost:8000/?query=${input}`).then((res) =>
    res.json()
  );
};

function AsyncPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <article className={classes.article}>
        <h1>Synchronous Autocomplete</h1>
        <p>
          This autocomplete uses words from the <code>sowpods.json</code> file
        </p>
        <Autocomplete getWords={getWordsLocal} maxWordsVisible={100} />
      </article>
      <article className={classes.article}>
        <h1>Asynchonous Autocomplete</h1>
        <p>
          This autocomplete fetches words from a remote source. Use the command
          <br/>
          <code className={classes.code}>node src/pages/introToAsync/simpleServer.js</code>
          <br/>
          to start a server that does so
        </p>
        <Autocomplete getWords={getWordsRemote} maxWordsVisible={100} />
        <p>Notice how each of the autocomplete dropdowns are layered over following elements and don't resize the page</p>
      </article>
    </div>
  );
}

export default AsyncPage;
