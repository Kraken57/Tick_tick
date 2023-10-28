const { functions } = require("firebase-functions");
const { initializeApp } = require("firebase-admin");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();

exports.createBoardData = functions.firestore
  .document("users/{uid}/boards/{boardId}")
  .onCreate((snapshot, context) => {
    const { uid, boardId } = context.params;
    const firestore = getFirestore();

    return firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
      tabs: {
        todos: [],
        inProgress: [],
        completed: [],
      },
      lastUpdated: FieldValue.serverTimestamp(),
    });
  });



// exports.deleteBoardData = onDocumentDeleted(
//   "users/{uid}/boards/{boardId}",
//   async (event) => {
//     const { uid, boardId } = event.params;
//     const firestore = getFirestore();

//     return await firestore.doc(`users/${uid}/boardsData/${boardId}`).delete();
//   }
// );
