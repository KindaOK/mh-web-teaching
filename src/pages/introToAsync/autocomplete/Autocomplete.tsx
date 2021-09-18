import React, { ChangeEvent, useEffect, useState } from "react";
import { makeStyles, MenuItem, TextField } from "@material-ui/core";

interface AutcompleteProps {
  // completionFunc:  (input: string) => string[];
  words: string[];
  maxWordsVisible: number;
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
  // const [highlightedIndex, setHighlightedIndex] = useSt

  useEffect(() => {
    // TODO: how to do this actually?
    const re = new RegExp(input);
    setFilteredWords(props.words.filter((word) => re.test(word)).slice(0, props.maxWordsVisible));
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
    setInput(word);
    hideList();
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "down") {

    }
  }

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

// interface AutocompleteEntryProps {
//   word: string;
// }

// function AutocompleteEntry(props: AutocompleteEntryProps) {
//   return <MenuItem
//
//   />;
// }

export default Autocomplete;
