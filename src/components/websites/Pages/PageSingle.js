import React, { useState, useContext, useEffect } from "react";
import firebase from "../../../firebase";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import UserContext from "../../../contexts/UserContext";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const PageSingle = () => {
  const { page } = useParams();
  const classes = useStyles();

  const { user } = useContext(UserContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [userData, setUserData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPageInfo, setCurrentPageInfo] = useState(null);
  const [postEditorState, setPostEditorState] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (!user) return;
    getData();
  }, [user]);
  const getData = async () => {
    const docRef = await firebase.db.collection("websites").doc(user.uid).get();

    setUserData(docRef.data());
    const titleString = page + "Info";
    if (docRef.data()[titleString]) {
      setPageInfo(docRef.data()[titleString]);
      setCurrentPageInfo(docRef.data()[titleString]);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(docRef.data()[titleString])
          )
        )
      );
    }
  };

  const handleEditorChange = (e) => {
    setEditorState(e);
    const editorJSON = convertToRaw(e.getCurrentContent());
    setPageInfo(draftToHtml(editorJSON));
  };

  const updateInfo = async (e) => {
    console.log(pageInfo);
    if (!user) {
      console.log("waiting to connect");
    } else {
      const titleString = page + "Info";

      const updateRef = firebase.db.collection("websites").doc(user.uid);
      console.log(titleString);
      updateRef.update(
        {
          [titleString]: pageInfo,
        },
        { merge: true }
      );
    }
  };

  const handleSubmit = async (e) => {
    console.log(pageInfo);
    if (!user) {
      console.log("waiting to connect");
    } else {
      const titleString = page + "Info";
      const finalString = page + "InfoStatus";
      const updateRef = firebase.db.collection("websites").doc(user.uid);
      console.log(titleString + " submitted for approval");
      updateRef.update(
        {
          [titleString]: pageInfo,
          [finalString]: "submitted",
        },
        { merge: true }
      );
    }
  };
  return (
    <div className="page-single">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/dashboard"
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Back to Dasboard
          </Typography>
        </Toolbar>
      </AppBar>
      <h3>Currently Updating the {page} page.</h3>
      <br />

      <div>
        <Editor
          editorState={editorState}
          editorStyle={{ minHeight: "300px", border: "1px solid black" }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorChange}
        />
      </div>
      <br />
      <div className="buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={updateInfo}
          name="update"
        >
          Update
        </Button>

        <Button
          variant="contained"
          color="primary"
          name="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      <div style={{ paddingTop: "50px" }}>
        <h4>Your Current Page Content</h4>
      </div>
      <div>{ReactHtmlParser(currentPageInfo)}</div>
    </div>
  );
};

export default PageSingle;
