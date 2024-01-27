import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import BoardTopbar from "./BoardTopbar";
import BoardInterface from "./BoardInterface";
import useStore from "../../store";
import useApp from "../../hooks/useApp";
import { useState } from "react";

const BoardScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  //const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boards, areBoardsFetched } = useStore();
  const { boardId } = useParams();
  const { fetchBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []);

  console.log({ data });

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData)
        //const { lastUpdated, tabs } = boardData;
        setData(boardData);

      //setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!areBoardsFetched || !board) navigate("/boards");
    else handleFetchBoard();
  }, []);

  return (
    <>
      <BoardTopbar {...board} />
      <BoardInterface />
    </>
  );
};

export default BoardScreen;
