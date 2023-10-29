const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

const db = admin.database();

exports.createBoardData = functions.database
  .ref("/users/{uid}/boards/{boardId}")
  .onCreate(async (snapshot, context) => {
    const { uid, boardId } = context.params;
    const boardsDataRef = db.ref(`users/${uid}/boardsData/${boardId}`);

    try {
      // Set initial data in the "boardsData" location
      await boardsDataRef.set({
        tabs: {
          todos: [],
          inProgress: [],
          completed: [],
        },
        lastUpdated: admin.database.ServerValue.TIMESTAMP,
      });
      return null; // Returning null indicates success
    } catch (error) {
      console.error("Error creating boardsData:", error);
      throw error; // Rethrow the error for further handling
    }
  });
