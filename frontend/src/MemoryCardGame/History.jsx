import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './History.module.css';
import axios from "axios";

const History = () => {
  const navigate = useNavigate();
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [history, setHistory] = useState([]);

  const handleBack = () => {
    navigate("/play");
  };

  const retrieveHistory = async () => {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      console.error("Error: userID is missing.");
      return;
    }

    const historyData = await axios.get(`http://localhost:8000/api/memory/history?userID=${userID}`, {
      headers: { "Content-Type": "application/json" },
    });

    setDataRetrieved(true);
    setHistory(historyData.data.history);
  };

  const HistoryTable = () => {
    return (<>
      <div className={styles.header}>
        <span>Date</span>
        <span>Difficulty</span>
        <span>Fails</span>
        <span>Time</span>
      </div>

      {
        history.map((entry, index) =>
          <div className={styles.entry} key={index}>
            <span>{entry.gameDate}</span>
            <span>{entry.difficulty}</span>
            <span>{entry.failed}</span>
            <span>{entry.timeTaken}</span>
          </div>
        )
      }
    </>);
  };

  if (!dataRetrieved) {
    retrieveHistory();
  }

  return (
    <div>
      {dataRetrieved ? <HistoryTable /> : <span>Loading...</span>}

      <br />

      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default History;
