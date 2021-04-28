import firebase from "../firebase";

export async function GetUserDataFromFirebase(userId) {
  const docRef = firebase.db.collection("users").doc(userId);
  const doc = await docRef.get();
  const data = doc.data();

  return data;
}

export async function GetUserWebsiteDataFromFirebase(userId) {
  const docRef = firebase.db.collection("websites").doc(userId);
  const doc = await docRef.get();
  const data = doc.data();

  return data;
}
