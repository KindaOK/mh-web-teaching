import React, { ChangeEvent, useEffect, useState } from "react";
import { makeStyles, MenuItem, TextField } from "@material-ui/core";

interface AutcompleteProps {
  // completionFunc:  (input: string) => string[];
  words: string[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGow: 1,
  },
  words: {
    position: "absolute",
    zIndex: 1000,
  },
}));

function Autocomplete(props: AutcompleteProps) {
  const classes = useStyles();
  const [input, setInput] = useState<string>("");
  const [filteredWords, setFilteredWords] = useState<string[]>(props.words);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  useEffect(() => {
    // TODO: how to do this actually?
    const re = new RegExp(input, "g");
    setFilteredWords(props.words.filter((word) => re.exec(word)));
  }, [input, props.words]);

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
    console.log(word);
    setInput(word);
    hideList();
  };

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

// interface AutocompleteEntryProps {
//   word: string;
// }

// function AutocompleteEntry(props: AutocompleteEntryProps) {
//   return <MenuItem
//
//   />;
// }

export default Autocomplete;
