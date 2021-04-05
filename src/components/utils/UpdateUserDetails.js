import firebase from "../../firebase";

//TODO function for updating design questions
export async function UpdateDesignQuestionsInDB(userId, updatedDoc) {
  const updateRef = firebase.db.collection("websites").doc(userId);
  updateRef.update(
    {
      designQuestions: updatedDoc,
    },
    { merge: true }
  );
}

//TODO function for updating hosting package selection
export async function UpdateHostingPackageInDB(userId, updatedDoc) {
  const updateRef = firebase.db.collection("websites").doc(userId);
  updateRef.update(
    {
      hostingPackage: updatedDoc,
    },
    { merge: true }
  );
}

//TODO function for updating stepstatus
export async function UpdateStepStatusInDB(userId, updatedDoc) {
  const { projectStatus, stepStatus } = updatedDoc;
  const updateRef = firebase.db.collection("users").doc(userId);
  updateRef.update(
    {
      projectStatus: projectStatus,
      stepStatus: stepStatus,
    },
    { merge: true }
  );
}

//TODO function for updating logo
export async function UpdateLogoUrlInDB(userId, updatedDoc) {
  const updateRef = firebase.db.collection("websites").doc(userId);
  updateRef.update(
    {
      logo: updatedDoc,
    },
    { merge: true }
  );
}

//TODO function for updating page content ?probably also need page title or something for this
export async function UpdatePageContentInDB(userId, updatedDoc, pageTitle) {
  const updateRef = firebase.db.collection("websites").doc(userId);
  const titleString = pageTitle + "Info";
  updateRef.update(
    {
      [titleString]: updatedDoc,
    },
    { merge: true }
  );
}
