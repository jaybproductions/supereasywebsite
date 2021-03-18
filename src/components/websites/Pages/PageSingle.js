import React, { useState, useContext, useEffect } from "react";
import firebase from "../../../firebase";
import { useParams } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
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

const PageSingle = () => {
  const { page } = useParams();

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
    console.log(docRef.data());
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
    console.log(editorJSON);
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
    <div>
      <h3>Currently Updating the {page} page.</h3>
      <br />

      <div
        style={{
          margin: "auto",
          width: "50%",
          height: "100%",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "lightgray",
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorChange}
        />
      </div>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={updateInfo}
        name="update"
      >
        Update
      </Button>
      <div style={{ display: "inline", paddingLeft: "10px" }} />
      <Button
        variant="contained"
        color="primary"
        name="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <div style={{ paddingTop: "50px" }}>
        <h4>Your Current Page Content</h4>
      </div>
      <div>{ReactHtmlParser(currentPageInfo)}</div>
    </div>
  );
};

export default PageSingle;
