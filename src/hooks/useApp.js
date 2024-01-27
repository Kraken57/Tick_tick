import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import useStore from "../store";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();
  const boardscolRef = collection(db, `user/${uid}/boards`);
  const { setBoards, addBoard } = useStore();

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } //else return null;
    } catch (err) {
      console.log(err);
      //throw err;
    }
  };

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardscolRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });

      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc.id,
      });
    } catch (err) {
      //TODO showing the msg in toastr
      console.log(err);
      throw err;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardscolRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));
      setBoards(boards);
    } catch (err) {
      //TODO msg toastr
      console.log(err);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  return {
    createBoard,
    fetchBoards,
    fetchBoard,
  };
};

export default useApp;
