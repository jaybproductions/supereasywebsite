import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Questionnaire from "../../websites/Questionnaire";

export default function DesignQuestionDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Design Questions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            These are your design selections we will use to build your website
            mockup. You can make changes to those selections here. Please be
            sure to click "Save Changes" to ensure we recieve these changes.
          </DialogContentText>
          <br />
          <Questionnaire />
        </DialogContent>
      </Dialog>
    </div>
  );
}
