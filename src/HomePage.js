import React, { useState, useEffect } from "react";
import App from "./App";
import assignmentDataJson from "./assignmentData.json";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState([]);

  useEffect(() => {
    console.log("refreshed");

    setAssignmentData(assignmentDataJson);
    setLoading(false);
  }, []);

  return (
    <div className="main-container">
      {!loading ? (
        <App assignmentData={assignmentData} />
      ) : (
        <div className="loading-card">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
