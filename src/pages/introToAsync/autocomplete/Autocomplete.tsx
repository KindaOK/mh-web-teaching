import React, { ChangeEvent, useEffect, useState } from "react";
import { makeStyles, MenuItem, TextField } from "@material-ui/core";

interface AutcompleteProps {
  // completionFunc:  (input: string) => string[];
  getWords: (input: string) => Promise<string[]>;
  maxWordsVisible: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
  },
  words: {
    position: "absolute",
    height: "25%",
    overflowY: "auto",
    background: "whitesmoke",
  },
}));

function Autocomplete(props: AutcompleteProps) {
  const classes = useStyles();
  const [input, setInput] = useState<string>("");
  const [filteredWords, setFilteredWords] = useState<string[]>([]);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  // const [highlightedIndex, setHighlightedIndex] = useSt

  // whenever we need to fetch fresh data, call the fetch function given through props and use that to update things
  useEffect(() => {
    // it may be better for the function given in props to control the number of items displayed
    props.getWords(input).then((words) => setFilteredWords(words.slice(0, props.maxWordsVisible)))
  }, [input, props.getWords]);

  const showList = () => {
    setIsListVisible(true);
  };
  const hideList = () => {
    setIsListVisible(false);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    showList();
  };
  const handleClickWord = (word: string) => {
    setInput(word);
    hideList();
  };

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === "down") {
  //
  //   }
  // }

  return (
    <div
    // this has to be here to prevent the onClick on MenuItem
    //  from being ignored because it got hidden before onClick ran
    //    so actually this has the same problem
    // onBlur={hideList}
    >
      <TextField
        id={"input"}
        label={"Autocomplete"}
        helperText={"Start typing to display options"}
        value={input}
        onClick={showList}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
      />
      <div
        // hidden={!isListVisible}
        className={classes.words}
        style={{ display: isListVisible ? "block" : "none" }}
      >
        {filteredWords.map((word) => (
          <MenuItem key={word} onClick={() => handleClickWord(word)}>
            {word}
          </MenuItem>
        ))}
      </div>
    </div>
  );
}

export default Autocomplete;
