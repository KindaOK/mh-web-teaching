import React, { useEffect, useState } from "react";
import { Note } from "app/types";
import Card from "@material-ui/core/Card";
import {
  Button,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formItem: {
    margin: `${theme.spacing(2)}px 0`,
  },
}));

function SimpleNotes() {
  const classes = useStyles();
  const [notes, setNotes] = useState<Note[]>([
    { title: "hi", text: "name", dateCreated: new Date() },
  ]);
  const [newNote, setNewNote] = useState<Note>({
    title: "",
    text: "",
    dateCreated: new Date(),
  });

  const addNote = () => {
    // update the notes list and set the creation time of the newest note to now
    setNotes([...notes, { ...newNote, dateCreated: new Date() }]);
    // clear out the new note form
    setNewNote({
      title: "",
      text: "",
      dateCreated: new Date(),
    });
  };

  // remove the given note and update the state
  const handleRemoveNote = (index: number) =>
    // keep all notes except for the once matching the index
    setNotes(notes.filter((_, i) => index !== i));

  const isValid = () => newNote.title || newNote.text;

  // only run once at component creation
  useEffect(() => {
    // try to load any saved notes
    //  if there are no saved notes, then parse an empty array
    const savedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");
    if (savedNotes?.length) {
      // when the notes are loaded, the Datetimes are still strings
      savedNotes.forEach((note: Record<string, unknown>) => {
        // so we parse them into Dates
        note.dateCreated = new Date(note.dateCreated as string);
      })
      setNotes(savedNotes);
    }
  }, []);

  // every time the notes are updated, save to local storage
  //  it doesn't matter what updates them
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    // Grid is a material-ui wrapper for a flexbox container
    <div className={classes.root}>
      <Grid container direction={"column"}>
        <Grid
          item
          container
          direction={"column"}
          xs={12}
          // justifyContent={"space-evenly"}
        >
          <TextField
            required
            id={"title"}
            label={"Title"}
            error={!isValid()}
            helperText={isValid() ? "" : "Title or Note is required"}
            value={newNote.title}
            onChange={(event) =>
              setNewNote({ ...newNote, title: event.target.value })
            }
            variant={"outlined"}
            fullWidth
            className={classes.formItem}
          />
          <TextField
            required
            id={"text"}
            label={"Note"}
            error={!isValid()}
            helperText={isValid() ? "" : "Title or Note is required"}
            value={newNote.text}
            onChange={(event) =>
              setNewNote({ ...newNote, text: event.target.value })
            }
            variant={"outlined"}
            fullWidth
            className={classes.formItem}
          />
          <Button
            disabled={!isValid()}
            onClick={addNote}
            variant={"contained"}
            color={"primary"}
            className={classes.formItem}
          >
            Add Note
          </Button>
        </Grid>
        <Grid item container direction={"column-reverse"} xs={12}>
          {notes.map((note, index) => (
            // the key is a hint to react to tell it when an element in a list has been modified
            // in our case, the most "unique" property is the time the note was created
            <Grid item key={note.dateCreated.getTime()}>
              {/*the delete function changes the notes array and the uses setNotes to update the state*/}
              <SingleNote
                note={note}
                deleteFunction={() => handleRemoveNote(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

interface NoteProps {
  note: Note;
  deleteFunction: () => void;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  // @ts-ignore typescript doesn't like it when you use these options
  timeStyle: "medium",
  dateStyle: "medium",
};

function SingleNote(props: NoteProps) {
  return (
    <Card>
      <CardHeader
        title={props.note.title}
        subheader={props.note.dateCreated.toLocaleString(
          // use default browser locale with custom date options
          [],
          dateOptions
        )}
        action={
          //  when the icon button is clicked, it will call it's respective delete function
          <IconButton onClick={props.deleteFunction}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {props.note.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SimpleNotes;
