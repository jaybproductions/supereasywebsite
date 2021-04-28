import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function ContactDialog({ open, setOpen }) {
  const classes = useStyles();
  const [type, setType] = useState("");
  const [text, setText] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose the type of contact request and give as much detail as
            you can.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value={10}>Question</MenuItem>
              <MenuItem value={20}>Request a Zoom Meeting</MenuItem>
              <MenuItem value={30}>Bug/Feature Request</MenuItem>
              <MenuItem value={40}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="details"
            label="Details"
            type="email"
            fullWidth
            multiline
            rows={4}
            value={text}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
