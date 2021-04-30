import firebase from "../firebase";

//! Adding new user to firebase db
export async function AddNewUser(newUserData) {
  //register new user with auth
  const newUser = await firebase.register(
    newUserData.firstName,
    newUserData.email,
    newUserData.password
  );

  //add to users collection
  firebase.db.collection("users").doc(newUser).set({
    id: newUser,
    isAdmin: false,
    firstName: newUserData.firstName,
    lastName: newUserData.lastName,
    businessName: newUserData.businessName,
    phone: newUserData.phone,
    username: newUserData.email,
    email: newUserData.email,
    currentStep: 0,
    stepStatus: "started",
    projectStatus: "started",
  });

  //add to websites collection
  firebase.db
    .collection("websites")
    .doc(newUser)
    .set({
      pages: newUserData.pageArr,
      id: newUser,
      client: newUserData.email,
      logo_url: "",
      designQuestions: {
        businessName: newUserData.businessName,
        references: newUserData.references,
        fonts: newUserData.fonts,
        colors: newUserData.colors,
        comments: newUserData.comments,
      },
    });
}

//Add lead to db - if not checked out
export async function AddNewLead(leadDoc) {
  await firebase.db.collection("leads").doc(leadDoc.email).set({
    leadDoc,
  });
}

//update lead in db
export async function UpdateLead(updatedLeadDoc) {
  const docRef = firebase.db.collection("leads").doc(updatedLeadDoc.email);
  const doc = await docRef.get();
  if (!doc.exists) {
    AddNewLead(updatedLeadDoc);
  } else {
    docRef.update({
      updatedLeadDoc,
    });
  }
}

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
      logo_url: updatedDoc,
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
