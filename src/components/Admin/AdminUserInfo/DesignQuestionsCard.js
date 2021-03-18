import React from "react";
import { Card, CardContent, TextField } from "@material-ui/core";

const DesignQuestionsCard = ({ websiteInfo }) => {
  return (
    <div className="website-info-card" style={{ paddingTop: "10px" }}>
      {websiteInfo.designQuestions ? (
        <>
          <h4>Design Questions</h4>
          <Card>
            <CardContent>
              <TextField
                variant="outlined"
                label="Business Name"
                value={websiteInfo.designQuestions.businessName}
                fullWidth
              />
              <br /> <br />
              <TextField
                variant="outlined"
                label="References"
                value={websiteInfo.designQuestions.references}
                fullWidth
              />
              <br /> <br />
              <TextField
                variant="outlined"
                label="Colors"
                value={websiteInfo.designQuestions.colors}
                fullWidth
              />
              <br /> <br />
              <TextField
                variant="outlined"
                label="Fonts"
                value={websiteInfo.designQuestions.fonts}
                fullWidth
              />
              <br /> <br />
              <TextField
                variant="outlined"
                label="Comments"
                value={websiteInfo.designQuestions.comments}
                multiline
                rows={4}
                fullWidth
              />
            </CardContent>
          </Card>{" "}
        </>
      ) : (
        <>Please wait for design questions. </>
      )}
    </div>
  );
};

export default DesignQuestionsCard;
