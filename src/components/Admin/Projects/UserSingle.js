import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField, Grid } from "@material-ui/core";
import DesignQuestionsCard from "../AdminUserInfo/DesignQuestionsCard";
import {
  GetUserDataFromFirebase,
  GetUserWebsiteDataFromFirebase,
} from "../../../utils/GetUserDetails";
import {
  handleAddMockupLink,
  handleAddStagingLink,
  handleApproveDesignQuestions,
} from "../../../utils/UpdateUserDetails";

const UserSingle = () => {
  const { project } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [mockupLink, setMockupLink] = useState("");
  const [stagingLink, setStagingLink] = useState("");
  const [websiteInfo, setWebsiteInfo] = useState(null);
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    handleGetDataFromApi();
  }, [project]);

  const handleGetDataFromApi = async () => {
    const data = await GetUserDataFromFirebase(project);
    const websiteData = await GetUserWebsiteDataFromFirebase(project);
    setSingleUser(data);
    setMockupLink(websiteData.mockupLink);
    setWebsiteInfo(websiteData);
    setStagingLink(websiteData.stagingLink);
    if (data.designQuestionStatus === "approved") {
      setApproved(true);
    }
  };

  return (
    <div className="user-single">
      {singleUser && (
        <>
          <Card>
            <CardContent style={{ padding: "40px" }}>
              <h3>
                Client Name: {singleUser.firstName} {singleUser.lastName}
              </h3>
              <br />
              Project Status: {singleUser.projectStatus}
            </CardContent>
          </Card>

          <br />
          <div style={{ margin: "auto", width: "50%" }}>
            <Grid container justify="center" spacing={6}>
              <Grid item xs={6}>
                {websiteInfo && (
                  <DesignQuestionsCard websiteInfo={websiteInfo} />
                )}
                <div style={{ paddingTop: "10px" }} />
                <Button
                  onClick={(e) =>
                    handleApproveDesignQuestions(
                      singleUser,
                      handleGetDataFromApi
                    )
                  }
                  variant="contained"
                  color="primary"
                  disabled={approved}
                >
                  {approved ? "Approved" : "Approve"}
                </Button>
              </Grid>

              <Grid item xs={6} style={{ margin: "auto" }}>
                <Card>
                  <CardContent>
                    <div
                      className="mockup-link-section"
                      style={{ padding: "20px" }}
                    >
                      <h4>Add Mockup Link</h4>
                      <TextField
                        variant="outlined"
                        value={mockupLink}
                        onChange={(e) => setMockupLink(e.target.value)}
                      />
                      <Button
                        onClick={(e) =>
                          handleAddMockupLink(singleUser, mockupLink)
                        }
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </div>

                    <div
                      className="staging-link-section"
                      style={{ padding: "20px" }}
                    >
                      <h4>Add Staging Site Link</h4>
                      <TextField
                        variant="outlined"
                        value={stagingLink}
                        onChange={(e) => setStagingLink(e.target.value)}
                      />
                      <Button
                        onClick={(e) =>
                          handleAddStagingLink(singleUser, stagingLink)
                        }
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSingle;
